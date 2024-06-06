import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  createProducts,
  deleteProducts,
  readProducts,
  updateProducts,
} from "../redux/slices/productsSlice";
import { Product } from "../types/prouductsTypes";

const ProuductsList = () => {
  const products = useSelector((state: RootState) => state.dataProducts.data);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res: AxiosResponse) => {
        dispatch(readProducts(res.data));
      })
      .catch((err: AxiosError) => console.error(err));
  }, [dispatch]);

  const [newProductName, setNewProductName] = useState<string>("");
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const handleCreateProduct = () => {
    if (!newProductName) return;
    const newProduct: Product = { id: Date.now(), name: newProductName };
    dispatch(createProducts(newProduct));
    axios
      .post("http://localhost:3001/products", newProduct)
      .then(() => {
        setNewProductName("");
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateProduct = () => {
    if (!editedProduct) return;
    dispatch(
      updateProducts({ id: editedProduct.id, name: editedProduct.name })
    );
    axios
      .put(`http://localhost:3001/products/${editedProduct.id}`, {
        name: editedProduct.name,
      })
      .then(() => {
        setEditedProduct(null);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteProduct = (id: number) => {
    if (!id) return;

    dispatch(deleteProducts(id));

    axios
      .delete(`http://localhost:3001/products/${id}`)
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>CRUD de Productos</h2>
      <h3>Lista de Productos</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editedProduct?.id === product.id ? (
              <div>
                <input
                  type="text"
                  value={editedProduct?.name}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                  }
                />
                <button onClick={handleUpdateProduct}>Actualizar</button>
              </div>
            ) : (
              <div>
                <span>{product.name}</span>
                <button onClick={() => setEditedProduct(product)}>
                  Editar
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <aside>
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <button onClick={handleCreateProduct}>Agregar Producto</button>
      </aside>
    </>
  );
};

export default ProuductsList;

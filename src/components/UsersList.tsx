import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { fetchUsers } from "../redux/slices/usersSlice";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/userTypes";
const UsersList: React.FC = () => {
  const users: User[] = useSelector(
    (state: RootState) => state.dataUsers.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res: AxiosResponse) => {
        dispatch(fetchUsers(res.data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <>
      <h3>Lista de Usuarios</h3>

      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;

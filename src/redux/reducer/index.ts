import { combineReducers } from "redux";
import userReducers from "../slices/usersSlice";
import productsReducer from "../slices/productsSlice";

const rootReducer = combineReducers({
  dataUsers: userReducers,
  dataProducts: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from "redux";
import userReducers from "../slices/usersSlice";

const rootReducer = combineReducers({
  dataUsers: userReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

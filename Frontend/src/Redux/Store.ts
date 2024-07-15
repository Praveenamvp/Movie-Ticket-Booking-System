import { createStore } from "redux";
import { movieReducer } from "./Reducer";

export const store=createStore(movieReducer)
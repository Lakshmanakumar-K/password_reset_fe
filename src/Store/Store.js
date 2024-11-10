import { configureStore } from "@reduxjs/toolkit";
import { appreducer } from "./Reducer/Appreducer.js";

export const store = configureStore({reducer:{appreducer},devTools:true});
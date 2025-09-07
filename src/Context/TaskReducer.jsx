import { act } from "react";

export const intialTaskState = [];
export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return action.payload;

    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
      case "UPDATE_TASK":
        return state.map((t)=>
        t.id===action.payload.id?action.payload:t);

    default:
      return state;
  }
};

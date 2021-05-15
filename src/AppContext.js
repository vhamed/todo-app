import React, { createContext, useContext, useReducer, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

export const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext)[0];
}

export function useAppReducer() {
  return useContext(AppContext)[1];
}

export function useItems() {
  const { items } = useAppState();

  const pending = items.filter((item) => item.status === "pending");
  const paused = items.filter((item) => item.status === "paused");
  const completed = items.filter((item) => item.status === "completed");

  return { pending, paused, completed };
}

const appStateReducer = (state, action) => {
  let nd = new Date();

  let currentDate = {
    day: format(nd, "dd"),
    dayDisplay: format(nd, "d"),
    month: format(nd, "MM"),
    monthDisplay: format(nd, "MMM"),
    year: format(nd, "y"),
    weekday: format(nd, "EEEE")
  };

  switch (action.type) {
    case "LOAD_ITEMS": {
      const newState = { ...state, items: action.items };
      return newState;
    }
    case "ADD_ITEM": {
      const newState = { ...state, items: state.items.concat(action.item) };
      return newState;
    }
    case "UPDATE_ITEM": {
      let newItems = [...state.items];
      let idx = newItems.findIndex((i) => i.id === action.item.id);
      console.log("newItem", action.item.status);
      newItems[idx] = action.item;
      const newState = { ...state, items: newItems };
      return newState;
    }
    case "DELETE_ITEM": {
      const newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.item.id)
      };
      return newState;
    }
    case "RESET_ALL": {
      const newItems = state.items
        .filter((item) => item.status !== "completed")
        .map((i) => {
          if (i.status === "paused") {
            return Object.assign({}, i, {
              status: "pending"
            });
          }
          return i;
        });
      const newState = { ...state, items: newItems, date: currentDate };
      return newState;
    }
    default:
      return state;
  }
};

export function AppStateProvider({ children }) {
  let nd = new Date();
  const initialState = {
    items: [],
    date: {
      day: format(nd, "dd"),
      dayDisplay: format(nd, "d"),
      month: format(nd, "MM"),
      monthDisplay: format(nd, "MMM"),
      year: format(nd, "y"),
      weekday: format(nd, "EEEE")
    }
  };

  const value = useReducer(appStateReducer, initialState);
  console.log("value", value);

  useEffect(() => {
    console.log("useEffect");
    const fetchTasks = async () => {
      try {
        const loadedItems = await axios.get("http://localhost:50505/tasks");
        console.log("items", loadedItems.data);
        value[1]({ type: "LOAD_ITEMS", items: loadedItems.data });
      } catch (e) {
        console.log("e", e);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}

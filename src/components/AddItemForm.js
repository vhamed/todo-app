import React, { useRef } from "react";
import { useAppReducer } from "../AppContext";
import axios from "axios";

import styles from "./AddItemForm.module.scss";

const createTask = async (data) => {
  let newTask = await axios.post("http://localhost:50505/tasks", data);
  Promise.resolve(newTask);
};

// Form to populate todo items
function AddItemForm() {
  const dispatch = useAppReducer();
  let inputRef = useRef();

  async function addItem(e) {
    e.preventDefault();
    const newItem = {
      text: inputRef.current.value,
      status: "pending"
    };
    console.log("newItem.text", newItem.text);
    if (!!newItem.text.trim()) {
      const createdItem = await axios.post(
        "http://localhost:50505/tasks",
        newItem
      );
      console.log("createdItem.data", createdItem.data);
      dispatch({ type: "ADD_ITEM", item: createdItem.data });
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    console.log("after if block");
  }

  return (
    <form className={styles.form} onSubmit={addItem}>
      <input ref={inputRef} placeholder="Add new item" autoFocus />
      <button type="submit" />
    </form>
  );
}

export default AddItemForm;

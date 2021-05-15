import React from "react";
import { useAppReducer } from "../AppContext";
import styles from "./Item.module.scss";
import axios from "axios";

// Individual todo item
function Item({ item }) {
  const dispatch = useAppReducer();
  let text = item.text;
  let paused = item.status === "paused";
  let completed = item.status === "completed";

  async function deleteItem() {
    try {
      await axios.delete(`http://localhost:50505/tasks/${item.id}`);
      console.log("toDelete item", item);
      dispatch({ type: "DELETE_ITEM", item });
    } catch (e) {
      console.log("e", e);
    }
  }

  async function updateItem(status) {
    let editedItem = { ...item, status };
    try {
      await axios.put(
        `http://localhost:50505/tasks/${editedItem.id}`,
        editedItem
      );
      dispatch({ type: "UPDATE_ITEM", item: editedItem });
    } catch (e) {
      console.log("e", e);
    }
  }

  function pauseItem() {
    // const pausedItem = { ...item, status: "paused" };
    // dispatch({ type: "UPDATE_ITEM", item: pausedItem });
    updateItem("paused");
  }

  function resumeItem() {
    // const pendingItem = { ...item, status: "pending" };
    // dispatch({ type: "UPDATE_ITEM", item: pendingItem });
    updateItem("pending");
  }

  function completeItem() {
    // const completedItem = { ...item, status: "completed" };
    // dispatch({ type: "UPDATE_ITEM", item: completedItem });
    updateItem("completed");
  }

  return (
    <div className={styles.item} tabIndex="0">
      <div className={styles.itemName}>{text}</div>
      <div
        className={`${styles.buttons} ${
          completed ? styles.completedButtons : ""
        }`}
      >
        <button
          className={styles.delete}
          onClick={deleteItem}
          tabIndex="0"
        ></button>
        {!paused && !completed && (
          <button
            className={styles.pause}
            onClick={pauseItem}
            tabIndex="0"
          ></button>
        )}
        {paused && !completed && (
          <button
            className={styles.resume}
            onClick={resumeItem}
            tabIndex="0"
          ></button>
        )}
        {!completed && (
          <button
            className={styles.complete}
            onClick={completeItem}
            tabIndex="0"
          ></button>
        )}
      </div>
    </div>
  );
}

export default Item;

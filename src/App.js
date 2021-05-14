import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("/tasks").then((res) => {
      console.log("res.data", res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Elements</h1>
      {data && data.map((element) => <h1>{element.title}</h1>)}
    </div>
  );
}

export default App;

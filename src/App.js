import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import DB from "./db.json";

function App() {
  const [listData, setListData] = useState(null);
  const [data, setData] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(data));
  }, [data]);

  return (
    <div className="todo">
      <Sidebar
        db={DB}
        setListData={setListData}
        data={data}
        setData={setData}
        isSidebarVisible={isSidebarVisible}
        tasks={tasks}
        setTasks={setTasks}
      />
      <Tasks
        db={DB}
        listData={listData}
        data={data}
        setData={setData}
        tasks={tasks}
        setTasks={setTasks}
      />
      <button
        className={`burger ${isSidebarVisible ? "active" : ""}`}
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </button>
    </div>
  );
}

export default App;

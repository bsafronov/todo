import React, { useEffect, useState } from "react";
import SidebarAdd from "./SidebarAdd";
import SidebarAll from "./SidebarAll";
import SidebarList from "./SidebarList";

function Sidebar({
  db,
  setListData,
  data,
  setData,
  isSidebarVisible,
  tasks,
  setTasks,
  setIsSidebarVisible,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const localIndex = localStorage.getItem("index");

    if (localIndex) {
      const localIndexParsed = parseInt(JSON.parse(localIndex));
      const index = localIndexParsed == NaN ? 0 : localIndexParsed;
      setActiveIndex(index);
    } else {
      localStorage.setItem("index", activeIndex);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("index", activeIndex);
  }, [activeIndex]);

  return (
    <div className={`todo__sidebar ${isSidebarVisible ? "active" : ""}`}>
      <div className="todo__sidebar-content">
        <SidebarAll
          data={data}
          setListData={setListData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setIsSidebarVisible={setIsSidebarVisible}
        />
        <SidebarList
          db={db}
          setData={setData}
          data={data}
          setListData={setListData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tasks={tasks}
          setTasks={setTasks}
          setIsSidebarVisible={setIsSidebarVisible}
        />
        <SidebarAdd
          db={db}
          data={data}
          setData={setData}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  );
}

export default Sidebar;

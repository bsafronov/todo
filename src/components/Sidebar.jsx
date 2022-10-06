import React, { useState } from "react";
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
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`todo__sidebar ${isSidebarVisible ? "active" : ""}`}>
      <div className="todo__sidebar-content">
        <SidebarAll
          data={data}
          setListData={setListData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
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
import React, { useEffect } from "react";
import TasksAdd from "./TasksAdd";
import TasksList from "./TasksList";
import TasksTop from "./TasksTop";

function Tasks({ db, listData, data, setData, tasks, setTasks }) {
  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");

    if (localTasks) {
      const localTasksParsed = JSON.parse(localTasks);
      setTasks(localTasksParsed);
    } else {
      setTasks(db.tasks);
      localStorage.setItem("tasks", JSON.stringify(db.tasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (!listData) return null;

  return listData.length > 0 ? (
    <div className="todo__tasks column">
      {listData.map(item => {
        const featuredTasks = tasks.filter(task => task.listId === item.id);

        return (
          featuredTasks.length > 0 && (
            <div className="tasks__content column" key={item.id}>
              <TasksTop data={data} setData={setData} listData={item} />
              <TasksList tasks={tasks} setTasks={setTasks} listData={item} />
            </div>
          )
        );
      })}
    </div>
  ) : (
    <div className="todo__tasks">
      <TasksTop data={data} setData={setData} listData={listData} />
      <div className="tasks__content">
        <TasksList tasks={tasks} setTasks={setTasks} listData={listData} />
        <TasksAdd tasks={tasks} setTasks={setTasks} listData={listData} />
      </div>
    </div>
  );
}

export default Tasks;

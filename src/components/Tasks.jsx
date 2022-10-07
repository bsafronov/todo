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

  if (listData.length > 0 && tasks.length > 0) {
    return (
      <div className="todo__tasks column">
        {listData.map(item => {
          const featuredTasks = tasks.filter(task => task.listId === item.id);

          if (featuredTasks.length > 0) {
            return (
              <div className="tasks__content column" key={item.id}>
                <TasksTop data={data} setData={setData} listData={item} />
                <TasksList tasks={tasks} setTasks={setTasks} listData={item} />
              </div>
            );
          }
        })}
      </div>
    );
  }

  if (!(listData instanceof Array)) {
    return (
      <div className="todo__tasks">
        <TasksTop data={data} setData={setData} listData={listData} />
        <div className="tasks__content">
          <TasksList tasks={tasks} setTasks={setTasks} listData={listData} />
          <TasksAdd tasks={tasks} setTasks={setTasks} listData={listData} />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="todo__none">
        <h1>Здесь ничего нет...</h1>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="todo__none">
        <h1>Задачи отсутствуют...</h1>
      </div>
    );
  }
}

export default Tasks;

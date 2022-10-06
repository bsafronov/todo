import React, { useRef, useState } from "react";

function TasksAdd({ tasks, setTasks, listData }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const inputRef = useRef(null);

  function addTask() {
    if (!inputRef.current.value) {
      return inputRef.current.focus();
    }

    setTasks([
      ...tasks,
      {
        listId: listData.id,
        text: inputRef.current.value,
        completed: false,
        id: Date.now(),
      },
    ]);

    inputRef.current.value = null;
    setIsFormVisible(false);
  }

  function focusOnAdd() {
    setIsFormVisible(true);
    inputRef.current.focus();
  }

  return (
    <div className="tasks__add-box">
      <button
        className={`tasks__add ${isFormVisible ? "disabled" : ""}`}
        onClick={focusOnAdd}
      >
        <svg
          className="tasks__add-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 1V15" stroke="#B4B4B4" />
          <path d="M1 8H15" stroke="#B4B4B4" />
        </svg>
        <span className="tasks__add-text">Новая задача</span>
      </button>
      <div className={`tasks__add-form ${isFormVisible ? "active" : ""}`}>
        <input
          className="tasks__add-form-input"
          type="text"
          placeholder="Текст задачи"
          ref={inputRef}
        />
        <button className="tasks__add-form-accept" onClick={addTask}>
          Добавить задачу
        </button>
        <button
          className="tasks__add-form-decline"
          onClick={() => setIsFormVisible(false)}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}

export default TasksAdd;

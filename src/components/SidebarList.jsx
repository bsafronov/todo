import React, { useEffect } from "react";

function SidebarList({
  db,
  data,
  setData,
  setListData,
  activeIndex,
  setActiveIndex,
  tasks,
  setTasks,
}) {
  useEffect(() => {
    const localLists = localStorage.getItem("lists");

    if (localLists) {
      const localListsParsed = JSON.parse(localLists);
      setData(localListsParsed);
    } else {
      const dataSet = db.lists.map(item => {
        let color = db.colors.find(color => color.id === item.colorId);
        return { ...item, color: color.hex };
      });
      setData(dataSet);
      localStorage.setItem("lists", JSON.stringify(dataSet));
    }
  }, []);

  useEffect(() => {
    if (activeIndex >= 0) {
      setListData(data.find(item => indexById(item.id) === activeIndex));
    }
  });

  function deleteList(id) {
    const deletedItemIndex = data.findIndex(item => item.id === id);
    const newList = data.filter(item => item.id !== id);
    const newTasks = tasks.filter(item => item.listId !== id);

    setData(newList);
    setTasks(newTasks);

    if (data.length - 1 === deletedItemIndex) {
      console.log(deletedItemIndex);
      if (deletedItemIndex === 0) return;
      setActiveIndex(deletedItemIndex - 1);
    } else {
      setActiveIndex(deletedItemIndex);
    }
  }

  function indexById(id) {
    return data.findIndex(item => item.id === id);
  }

  return (
    <ul className="sidebar__list">
      {data.map(item => (
        <li className="sidebar__item" key={item.id}>
          <button
            className={`sidebar__btn ${
              indexById(item.id) === activeIndex ? "active" : ""
            }`}
            onClick={() => setActiveIndex(indexById(item.id))}
          >
            <div className="sidebar__btn-content">
              <span
                className="sidebar__btn-icon"
                style={{ backgroundColor: `${item.color}` }}
              ></span>
              <span className="sidebar__btn-text">{item.name}</span>
            </div>
            <span
              className="sidebar__btn-remove"
              onClick={e => {
                e.stopPropagation();
                deleteList(item.id);
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
                  fill="#E3E3E3"
                />
              </svg>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SidebarList;

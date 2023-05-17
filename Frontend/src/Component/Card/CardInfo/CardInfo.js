import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import Card_Edits from "../../Card_Edits/Card_Edits";
import Modal from "../../Modal/Modal";
import "./CardInfo.css";
// import axios from 'axios';

async function fetchData() {
  try{
    const response = await fetch("http://localhost:3000/fyp/taskCategories",{
      method: "GET",
      headers: {
        "authorization": `"${localStorage.getItem("token")}"`,
      },
    });
    const data = await response.json();
    console.log(data);
  }
  catch (error) {
    console.error(error);
  }
}
function CardInfo(props) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];
  const [taskCategories, setTaskCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // await fetch('http://localhost:3000/fyp/taskCategories',
  // {
  //   method: 'GET',
  //   headers: {
  //     "Authorization" : `Barear `+localStorage.getItem('token'),
  //   }
  // })
  // .then(response => response.json())
  // .then(response => console.log(response))
  // .catch(err => console.error(err));
  // }

  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({
    ...props.card,
  });
  
  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };
  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
  };
  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };
  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);
    setValues({
      ...values,
      labels: tempLabels,
    });
  };
  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
  };
  const removeTask = (id) => {
    const tasks = [...values.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };
  const updateTask = (id, value) => {
    const tasks = [...values.tasks];
    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;
    tasks[index].completed = value;
    setValues({
      ...values,
      tasks,
    });
  };
  const calculatePercent = () => {
    if (!values.tasks || !values.tasks.length) return 0;
    const completed = values.tasks.filter((item) => item.completed);
    if (!completed) return 0;
    return (completed.length / values.tasks.length) * 100;
  };
  const updateDate = (date) => {
    if (!date) return;
    setValues({
      ...values,
      date,
    });
  };
  const [filteredTasks, setFilteredTasks] = useState([]);
  const categories = [
    { id: 25, name: "Task" },
    { id: 26, name: "Bug" },
    { id: 27, name: "Sub Task" },
    // Add more categories as needed
  ];
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;

    // Filter the tasks based on the selected category ID
    const filteredTasks = selectedCategoryId
      ? values.tasks.filter((item) => item.categoryId === selectedCategoryId)
      : values.tasks;

    // Update the filtered tasks in state
    setFilteredTasks(filteredTasks);
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Title</p>
          </div>
          <Card_Edits
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Description</p>
          </div>
          <Card_Edits
            defaultValue={values.desc}
            text={values.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo_box_labels">
            {values.labels && values.labels.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <ul>
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li_active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Card_Edits
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>
        {/* <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <CheckSquare />
              <p>Tasks</p>
            </div>
            <div className="cardinfo_box_progress-bar">
              <div
                className="cardinfo_box_progress"
                style={{
                  width: `${calculatePercent()}%`,
                  backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                }}
              />
            </div>
            <div className="cardinfo_box_task_list">
              {values.tasks && values.tasks.map((item) => (
                <div key={item.id} className="cardinfo_box_task_checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    onChange={(event) => updateTask(item.id, event.target.checked)}
                  />
                  <p className={item.completed ? "completed" : ""}>{item.text}</p>
                  <Trash onClick={() => removeTask(item.id)} />
                </div>
              ))}
            </div>
            <Card_Edits
              text={"Add a Task"}
              placeholder="Enter task"
              onSubmit={addTask}
            />

          </div> */}

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <CheckSquare />
            <p>Issue Type</p>
          </div>

          {/* //tracking line */}
          {/* <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
              }}
            />
          </div> */}
          <div className="cardinfo_box_task_list">
            {values.tasks && values.tasks.map((item) => (
              <div key={item.id} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) => updateTask(item.id, event.target.checked)}
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <div>
            <select className="task_categories_dropdown" onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              {taskCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* <Card_Edits
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          /> */}
        </div>

      </div>
    </Modal>
  );
}

export default CardInfo;
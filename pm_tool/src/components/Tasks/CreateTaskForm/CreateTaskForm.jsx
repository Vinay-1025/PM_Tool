import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../../store/slices/tasksSlice";
import "./CreateTaskForm.css";

const CreateTaskForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    todoType: "default",
    visibility: ["all"],
    priority: "medium",
    status: "todo",
    startDate: "",
    dueDate: "",
    estimatedInternal: "",
    estimatedExternal: "",
    category: "",
    taskKey: "",
    postToShoutout: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "visibility") {
      setForm((prev) => ({
        ...prev,
        visibility: checked
          ? [...prev.visibility, value]
          : prev.visibility.filter(v => v !== value)
      }));
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createTask({
        ...form,
        estimatedTime: {
          internal: Number(form.estimatedInternal),
          external: Number(form.estimatedExternal)
        }
      })
    );

    onSuccess();
  };

  return (
    <form className="createTaskForm" onSubmit={handleSubmit}>
      {/* Title */}
      <label>Title *</label>
      <input
        name="title"
        required
        placeholder="Enter task title"
        onChange={handleChange}
      />

      {/* Todo Type */}
      <div className="checkboxRow">
        <label><input type="radio" name="todoType" value="default" onChange={handleChange} /> Default</label>
        <label><input type="radio" name="todoType" value="personal" onChange={handleChange} /> Personal</label>
        <label><input type="radio" name="todoType" value="private" onChange={handleChange} /> Private</label>
      </div>

      {/* Visibility */}
      <label>Visibility</label>
      <div className="checkboxRow">
        {["all","employee","contractor","customer","intern"].map(v => (
          <label key={v}>
            <input
              type="checkbox"
              name="visibility"
              value={v}
              defaultChecked={v === "all"}
              onChange={handleChange}
            />
            {v}
          </label>
        ))}
      </div>

      {/* Description */}
      <label>Description</label>
      <textarea
        name="description"
        placeholder="Task description"
        onChange={handleChange}
      />

      {/* Meta */}
      <div className="formRow">
        <select name="priority" onChange={handleChange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select name="status" onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="review">Review</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Dates */}
      <input type="date" name="startDate" onChange={handleChange} />
      <input type="date" name="dueDate" onChange={handleChange} />

      {/* Estimated Time */}
      <div className="formRow">
        <input
          name="estimatedInternal"
          placeholder="Internal hours"
          type="number"
          onChange={handleChange}
        />
        <input
          name="estimatedExternal"
          placeholder="External hours"
          type="number"
          onChange={handleChange}
        />
      </div>

      {/* Category */}
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
      />

      {/* Extras */}
      <label className="checkboxSingle">
        <input
          type="checkbox"
          name="postToShoutout"
          onChange={handleChange}
        />
        Post to Shoutout
      </label>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTaskForm;

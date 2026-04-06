import { FiClock } from "react-icons/fi";
import "./TodoByDeadline.css";

const todos = [
  {
    task: "About Us Page – Hubspots",
    project: "Accelyzei Website",
    due: "25-10-2024",
  },
];

const TodoByDeadline = () => {
  return (
    <div className="todoDeadline-card">
      <h4 className="todoDeadline-title">Top Todos by Deadline</h4>

      <div className="todoDeadline-list">
        {todos.map((todo) => (
          <div key={todo.task} className="todoDeadline-item">
            <div className="todoDeadline-info">
              <span className="todoDeadline-task">{todo.task}</span>
              <span className="todoDeadline-project">{todo.project}</span>
            </div>

            <div className="todoDeadline-date">
              <FiClock />
              {todo.due}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoByDeadline;

import "./ManageTodos.css";

const ManageTodos = () => {
  return (
    <div className="todoListCard">
      <h3>Manage Todos</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Release checklist</td>
            <td>James</td>
            <td>Medium</td>
            <td>
              <span className="status done">Done</span>
            </td>
            <td>
              <button className="manageBtn">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageTodos;

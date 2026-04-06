import "./MyTodos.css";

const MyTodos = () => {
  return (
    <div className="todoListCard">
      <h3>My Todos</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Implement login UI</td>
            <td>High</td>
            <td>15 Jan</td>
            <td>
              <span className="status inprogress">In Progress</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyTodos;

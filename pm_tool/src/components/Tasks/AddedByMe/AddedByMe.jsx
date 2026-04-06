import "./AddedByMe.css";

const AddedByMe = () => {
  return (
    <div className="todoListCard">
      <h3>Todos Added By Me</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>API integration</td>
            <td>David</td>
            <td>
              <span className="status todo">Todo</span>
            </td>
            <td>20 Jan</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddedByMe;

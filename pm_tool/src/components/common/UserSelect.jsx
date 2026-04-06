import React from 'react'

const UserSelect = ({ label, users, value, onChange, multiple }) => {
  return (
    <div className="form-group">
      <label>{label}</label>

      <select
        multiple={multiple}
        value={value}
        onChange={e => {
          const val = multiple
            ? [...e.target.selectedOptions].map(o => o.value)
            : e.target.value
          onChange(val)
        }}
      >
        {!multiple && <option value="">Select</option>}

        {users.map(u => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.role})
          </option>
        ))}
      </select>
    </div>
  )
}

export default UserSelect

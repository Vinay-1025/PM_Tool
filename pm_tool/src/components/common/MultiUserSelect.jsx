import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Popper from "@mui/material/Popper";

const CustomPopper = (props) => {
  return <Popper {...props} style={{ zIndex: 4000 }} />;
};

const MuiUserMultiSelect = ({
  label,
  users = [],
  value = [],
  onChange
}) => {
  return (
    <Autocomplete
      multiple
      options={users}
      value={value}
      fullWidth
      disableCloseOnSelect
      disablePortal   // 🔴 IMPORTANT
      PopperComponent={CustomPopper}
      getOptionLabel={(option) =>
        option?.name ? `${option.name} (${option.role})` : ""
      }
      isOptionEqualToValue={(option, value) =>
        option?._id === value?._id
      }
      onChange={(e, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="Search & select"
        />
      )}
    />
  );
};

export default MuiUserMultiSelect;

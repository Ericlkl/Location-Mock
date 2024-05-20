import { IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface LocationInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <TextField
      fullWidth
      sx={{ my: 1 }}
      label={label}
      value={value}
      InputProps={
        value.length > 0
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setValue("")} edge="end">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default LocationInput;

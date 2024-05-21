import { Button, Stack, Typography } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

// Types
import { QueryState } from "@/types";
// Custom Component
import LocationInput from "@/components/Form/LocationInput";

interface SearchFormProps {
  origin: string;
  destination: string;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  queryState: QueryState;
  onSubmit: () => void;
  onReset: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  origin,
  destination,
  setOrigin,
  setDestination,
  queryState,
  onSubmit,
  onReset
}) => {
  return (
    <Stack padding={3} minWidth={{ xs: 0, md: 400 }}>
      <Stack marginTop={8}>
        <LocationInput
          label="Start point"
          value={origin}
          setValue={setOrigin}
        />
        <LocationInput
          label="Drop-off point"
          value={destination}
          setValue={setDestination}
        />
      </Stack>

      <Stack marginX={1} marginY={4}>
        {queryState.status === 'failure' && (
          <Typography color="red" fontWeight="bold" >{queryState.error}</Typography>
        )}
        {queryState.status === "success" && (
          <>
            <Typography>Total distance: {queryState.total_distance}</Typography>
            <Typography>Total time: {queryState.total_time}</Typography>
          </>
        )}
      </Stack>

      <Stack direction="row" width="100%" spacing={5}>
        <Button onClick={onReset} fullWidth variant="outlined">
          Reset
        </Button>
        <Button
          fullWidth
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default SearchForm;

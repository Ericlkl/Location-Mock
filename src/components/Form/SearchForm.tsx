import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

// Custom Component
import LocationInput from "@/components/Form/LocationInput";

const SearchForm = () => {
  return (
    <Stack padding={3} minWidth={{ xs: 0, md: 400 }}>
      <Stack marginTop={8}>
        <LocationInput label="Drop-off point" value="" setValue={() => {}}/>
        <LocationInput label="Drop-off point" value="" setValue={() => {}}/>
      </Stack>

      <Stack marginX={1} marginY={4}>
        <Typography>Total distance: </Typography>
        <Typography>Total time: </Typography>
      </Stack>

      <Stack direction="row" width="100%" spacing={5}>
        <Button fullWidth variant="outlined">
          Reset
        </Button>
        <Button fullWidth variant="contained" endIcon={<SendIcon />}>
          Re-Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default SearchForm;

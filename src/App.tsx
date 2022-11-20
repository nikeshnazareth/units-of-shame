import { Typography, Box } from "@mui/material";
import { DuolingoProvider } from "./DuolingoContext";
import Scores from "./Scores"

function App() {
  return (
    <DuolingoProvider>
      <Box p={2} mt={2} textAlign="center">
        <Typography variant="h2">Units of Shame</Typography>
        <Typography variant="h3">Duolingo</Typography>
        <Scores></Scores>
      </Box>
    </DuolingoProvider>
  );
}

export default App;

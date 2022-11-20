import { Typography } from "@mui/material";
import { useContext } from "react";

import { DuolingoContext } from "./DuolingoContext";

const Scores = () => {
  const duo = useContext(DuolingoContext);
  const XP = duo.getXP();
  return <Typography variant="body1">Nikesh: {XP}</Typography>;
};

export default Scores;

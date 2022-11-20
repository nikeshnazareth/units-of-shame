import { Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { DuolingoContext } from "./DuolingoContext";
import { User } from "./types/user"

const Scores = () => {
  const { getXP } = useContext(DuolingoContext);
  const [usersXP, setUsersXP] = useState<User[]>([])

  useEffect(() => {
    getXP()
      .then(setUsersXP)
  }, [getXP])

  return <>
    {usersXP.map(u => <Typography variant="body1">{u.name}: {u.XP}</Typography>)}
  </>
};

export default Scores;

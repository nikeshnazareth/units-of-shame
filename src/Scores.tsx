import { Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { DuolingoContext } from "./DuolingoContext";
import { User } from "./types/user";

const Scores = () => {
  const { getXP } = useContext(DuolingoContext);
  const [usersXP, setUsersXP] = useState<User[]>([]);

  useEffect(() => {
    getXP()
      .then((users) => users.sort((a, b) => b.XP - a.XP))
      .then(setUsersXP);
  }, [getXP]);

  return (
    <>
      {usersXP.map((u) => (
        <Typography variant="body1" key={u.username}>
          {u.name}: {u.XP}
        </Typography>
      ))}
    </>
  );
};

export default Scores;

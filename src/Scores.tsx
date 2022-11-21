import { Container, Stack, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { DuolingoContext } from "./DuolingoContext";
import { User } from "./types/user";

const Scores = () => {
  const { getXP, getCompetitors } = useContext(DuolingoContext);
  const [usersXP, setUsersXP] = useState<User[]>([]);

  useEffect(() => {
    Promise.all(getCompetitors().map(getXP))
      .then((users) => users.sort((a, b) => b.XP - a.XP))
      .then(setUsersXP);
  }, [getXP, getCompetitors]);

  return (
    <Container style={{ padding: "50px" }}>
      <Stack spacing={2}>
        {usersXP.map((u) => (
          <Typography variant="body1" key={u.username}>
            {u.name}: {u.XP}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default Scores;

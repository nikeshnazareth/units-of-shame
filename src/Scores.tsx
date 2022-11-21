import { Container, Card, Stack, Typography, Avatar } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { DuolingoContext } from "./DuolingoContext";
import { User } from "./types/user";

const Scores = () => {
  const { getXP, getCompetitors } = useContext(DuolingoContext);
  const [usersXP, setUsersXP] = useState<User[]>([]);

  useEffect(() => {
    Promise.all(getCompetitors().map(getXP))
      .then((users) =>
        users.sort((a, b) => b.XP - b.baseline - (a.XP - a.baseline))
      )
      .then((user) => {
        console.log(user);
        return user;
      })
      .then(setUsersXP);
  }, [getXP, getCompetitors]);

  return (
    <Container style={{ padding: "50px" }}>
      <Stack spacing={2} style={{ alignItems: "center" }}>
        {usersXP.map((u) => (
          <Card key={u.username} style={{ width: 300, padding: 20 }}>
            <Container
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginBottom: 20,
              }}
            >
              <Avatar
                alt={u.name}
                src={u.picture}
                sx={{ width: 70, height: 70 }}
              />
            </Container>
            <Typography variant="subtitle1">Total: {u.XP}</Typography>
            <Typography variant="subtitle1">Baseline: {u.baseline}</Typography>
            <Typography variant="h6" style={{ color: "green" }}>
              +{u.XP - u.baseline}
            </Typography>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Scores;

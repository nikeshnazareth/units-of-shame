import {
  Container,
  Card,
  Stack,
  Typography,
  Avatar,
  Icon,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { DuolingoContext } from "./DuolingoContext";
import { User } from "./types/user";

const Scores = () => {
  const { getXP, getCompetitors } = useContext(DuolingoContext);
  const [usersXP, setUsersXP] = useState<User[]>([]);

  const progress = (user: User) => user.XP - user.baseline;
  // the first user (leader) is the reference
  const shortfall = (user: User) => progress(usersXP[0]) - progress(user);
  const shame = (user: User) => {
    const s = shortfall(user);
    return (s > 10000 ? 1 : 0) + Math.max(Math.floor((s - 10000) / 5000), 0);
  };

  useEffect(() => {
    Promise.all(getCompetitors().map(getXP))
      .then((users) => users.sort((a, b) => progress(b) - progress(a)))
      .then(setUsersXP);
  }, [getXP, getCompetitors]);

  return (
    <Container style={{ padding: "50px" }}>
      <Stack spacing={2} style={{ alignItems: "center" }}>
        {usersXP.map((u, idx) => (
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
            <Typography variant="subtitle1">Progress: {progress(u)}</Typography>
            {shortfall(u) > 0 ? (
              <Typography
                variant="h6"
                style={{ color: shame(u) ? "red" : "orange" }}
              >
                -{shortfall(u)}
              </Typography>
            ) : null}
            {/* replace the icon with ThumbsDownIcon */}
            { Array(shame(u)).map((_, i) => (<Icon key={i}></Icon>)) }
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Scores;

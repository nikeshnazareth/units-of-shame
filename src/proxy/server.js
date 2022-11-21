const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const Duolingo = require("duolingo-api");

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/user/:username", async (req, res) => {
  const credential = {
    username: req.params.username,
  };
  const duoAPI = new Duolingo(credential);
  const result = await duoAPI.getRawData();
  const user = result.users[0];
  const status = {
    name: user.name,
    username: user.username,
    XP: user.totalXp,
  };
  res.send(status);
});

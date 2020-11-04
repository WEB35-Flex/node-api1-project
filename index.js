const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];

server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else {
    res.status(200).json(users);
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  let found = users.find((u) => u.id === id);

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (found) {
    res.status(200).json(found);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved " });
  }
});

const port = 8000;

server.listen(port, () => console.log(`server up and running on port ${port}`));

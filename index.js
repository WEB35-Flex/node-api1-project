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

let nextId = shortid.generate();

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

server.post("/api/users", (req, res) => {
  const newUser = { id: nextId, name: req.body.name, bio: req.body.bio };

  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (newUser.name || newUser.bio) {
    users.push(newUser);
    res.status(201).json(users);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const found = users.find((u) => u.id === id);

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (found) {
    users = users.filter((u) => u.id !== id);
    res.status(200).json(found);
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});

server.put("/api/users/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  let found = users.find((u) => u.id === id);

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exists." });
  } else if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else if (found) {
    Object.assign(found, changes);

    res.status(200).json(found);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified" });
  }
});

const port = 8000;

server.listen(port, () => console.log(`server up and running on port ${port}`));

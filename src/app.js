const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { url, title, techs } = request.body;

  const likes = 0;
  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes
  }
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const reposIndex = repositories.findIndex(r => r.id == id);

  if (reposIndex <= 0){
    return response.status(400).json({ error: 'Not found ID ' })
  }

  const { likes } = repositories.find(r => r.id = id); 

  const repo =  { url, title, techs, likes, id };


  repositories[reposIndex] = repo;

  return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repoIndex = repositories.findIndex( re => re.id == id);

  if (repoIndex <= 0){
    return response.status(400).json();
  }
  repositories.splice(repoIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repoIndex = repositories.findIndex(r => r.id == id);
  if (repoIndex < 0){
    return response.status(400).json({ error: `Repositoy not found with ID: ${id}`});
  }

  const repo = repositories.find(r => r.id = id);

  repo.likes += 1;

  repositories[repoIndex] = repo;
  return response.json(repo);

});

module.exports = app;

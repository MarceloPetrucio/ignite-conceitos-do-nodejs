const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  let user = users.find(user => user.username === username);

  if (!user) return response.status(404).json({error: "User not found"});

  request.user = user;
  return next();  
}

app.post('/users', (request, response) => {
  const {name, username} = request.body;

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: [],
  });

  return response.status(201).send();
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const {  } = request.body;


  user.todos.push({
    id: uuidv4(), // precisa ser um uuid
    title: 'Nome da tarefa',
    done: false, 
    deadline: '2021-02-27T00:00:00.000Z', 
    created_at: '2021-02-22T00:00:00.000Z'
  });
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
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

function getTodoUser(id){
  const todo = user.todos.find(todo => todo.id === id);
  if (!todo) return response.status(404).json({error: "Todo not found"});

  return todo

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
  const { title, deadline } = request.body;

  user.todos.push({
    id: uuidv4(),
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  });

  return response.status(201).send();
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  const { id } = request.params;  

  const todo = user.todos.find(todo => todo.id == id);
  if (!todo) return response.status(404).json({error: "Todo not found"});

  todo.title = title;
  todo.deadline = deadline; 

  return response.status(204).send();
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request; 
  const { id } = request.params;  

  const todo = user.todos.find(todo => todo.id === id);
  if (!todo) return response.status(404).json({error: "Todo not found"});

  todo.done = true;

  return response.status(204).send();
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request; 
  const { id } = request.params;  


});

module.exports = app;
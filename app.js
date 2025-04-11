const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Banco de dados simulado (array em memória)
let tasks = [
  { id: 1, title: "Aprender Node.js", completed: false },
  { id: 2, title: "Criar API REST", completed: true },
  { id: 3, title: "Criar metodos faceis", completed: true },
  { id: 4, title: "Apreender ingles", completed: true },
  { id: 5, title: "Conseguir um emprego", completed: true }
];

// Rota GET para listar todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Rota GET para buscar uma tarefa específica
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
  res.json(task);
});

// Rota POST para criar nova tarefa
app.post('/taskss', (req, res) => {
  if (!req.body.title) {
    
    return res.status(400).json({ message: "O campo 'title' é obrigatório" });
  }

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false
  };s

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota PUT para atualizar uma tarefa
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  res.json(task);
});

// Rota DELETE para excluir uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: "Tarefa não encontrada" });

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
const express = require('express');
const app = express();
const Lista = require('./model/model');  // Modelo Sequelize
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota GET para listar todas as tarefas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Lista.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
  }
});

// Rota GET para buscar uma tarefa específica
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Lista.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
  }
});

// Rota POST para criar nova tarefa
app.post('/tasks', async (req, res) => {
  if (!req.body.titulo) {
    return res.status(400).json({ message: "O campo 'titulo' é obrigatório" });
  }

  try {
    const newTask = await Lista.create({
      titulo: req.body.titulo
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
  }
});

// Rota PUT para atualizar uma tarefa
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Lista.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    task.titulo = req.body.titulo || task.titulo;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
});

// Rota DELETE para excluir uma tarefa
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Lista.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    await task.destroy();
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

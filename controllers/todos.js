const todos = [];

export const getTodos = (req, res) => {
  res.send({ message: "Todos retrieved successfully", todos });
};

export const createTodo = (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    isCompleted: false,
  };
  todos.push(newTodo);
  res.status(201).send({ message: "Todo created successfully", todo: newTodo });
};

export const getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }
  res.send({ message: "Todo retrieved successfully", todo });
};

export const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }
  todo.title = title;
  todo.isCompleted = isCompleted;
  res.send({ message: "Todo updated successfully", todo });
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send({ message: "Todo not found" });
  }
  todos.splice(index, 1);
  res.send({ message: "Todo deleted successfully" });
};

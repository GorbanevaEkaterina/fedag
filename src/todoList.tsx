import React, { useState, useEffect } from 'react';



// Интерфейс для задачи
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка при загрузке данных');
        return response.json();
      })
      .then((data: unknown) => {
       
        if (Array.isArray(data) && data.every((item) => 'id' in item && 'title' in item && 'completed' in item)) {
          console.log('Данные из API:', data); // Логирование данных
          setTodos(data as Todo[]);
        } else {
          setError('Неверный формат данных');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

 
  if (error) return <div>Ошибка: {error}</div>;

  
  if (loading) return <div>Загрузка...</div>;

  
  return (
    <div>
      <h1>Список задач</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> -{' '}
            {todo.completed ? 'Выполнено' : 'Не выполнено'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
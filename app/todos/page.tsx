// code for listing all the todos
"use client";
import { Input } from '@/components/ui/input';
import TodoItem from '@/components/TodoItem';
import React, { useEffect, useState } from 'react';
import { type Todo } from '@/lib/types';
import { createTodo, fetchTodos, deleteTodo, updateTodo, patchTodo } from '@/lib/todos';

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');


  // focus on todo-input when page loads
  // also focus when there are no todos
  useEffect(() => {
    fetchTodos().then(data => {
      setTodos(data);
    }).catch(err => {
      console.error('Error fetching todos:', err);
    });

    
    // prevent from triggering twice in dev mode
    if (typeof window !== 'undefined') {
      const input = document.getElementById('todo-input');
      if (input) {
        input.focus();
      }
    }
  }, []);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      createTodo(inputValue.trim()).then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setInputValue('');
      }).catch(err => {
        console.error('Error creating todo:', err);
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const toggleTodo = (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (!todoToToggle) return;

    patchTodo(id, !todoToToggle.completed).then(updatedTodo => {
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    }).catch(err => {
      console.error('Error toggling todo:', err);
    });
  };

  const handleDelete = (id: number) => {
    deleteTodo(id).then(() => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }).catch(err => {
      console.error('Error deleting todo:', err);
    });
  };

  const handleEdit = (id: number, newText: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    updateTodo(id, newText).then(updatedTodo => {
      console.log('Updated todo:', updatedTodo);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    }).catch(err => {
      console.error('Error updating todo:', err);
    });
  };

  if (todos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-700 text-white">
        <div className='items-center text-center'>
          <h1 className="text-6xl font-bold mb-4">Todos</h1>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            type='text'
            placeholder='Buy Groceries'
            id='todo-input'
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-700 text-white p-4">
      <h1 className="text-6xl font-bold mb-4 text-center">Todos</h1>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <h2 className="text-2xl font-semibold mb-2">Incomplete</h2>
          <ul className="mb-4">
            {todos.filter(todo => !todo.completed).map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </ul>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            type='text'
            placeholder='Add todo'
            id='todo-input'
          />
        </div>
        <div className="w-1/2 pl-2">
          <h2 className="text-2xl font-semibold mb-2">Complete</h2>
          <ul>
            {todos.filter(todo => todo.completed).map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
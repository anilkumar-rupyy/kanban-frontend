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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Your Todos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
              Incomplete
            </h2>
            <ul className="mb-4 space-y-2">
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
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Complete
            </h2>
            <ul className="space-y-2">
              {todos.filter(todo => todo.completed).map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={handleDelete} onEdit={handleEdit} />
              ))}
            </ul>
          </div>
      </div>
    </div>
    </div>
  );
}

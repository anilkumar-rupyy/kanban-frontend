import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Todo } from '@/lib/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  useEffect(() => {
    setEditText(todo.title);
  }, [todo.title]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <li className="p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 text-white rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="p-3 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-center">
        <span
          className={`cursor-pointer flex-1 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.title}
        </span>
        <div className="ml-2 flex gap-1">
          <button
            onClick={handleEdit}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
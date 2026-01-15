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
      <li className="p-2 bg-gray-600 rounded mb-1">
        <div className="flex items-center">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 mr-2"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-1"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="p-2 bg-gray-600 rounded mb-1 hover:bg-gray-500">
      <div className="flex justify-between items-center">
        <span
          className={`cursor-pointer flex-1 ${todo.completed ? 'line-through' : ''}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.title}
        </span>
        <div className="ml-2">
          <button
            onClick={handleEdit}
            className="px-2 py-1 bg-gray-200 text-black rounded hover:bg-cyan-400 mr-1"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-2 py-1 bg-white text-black rounded hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
import axios from "axios";

export async function fetchTodos() {
    try {
        const response = await axios.get('/api/todos');
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}

export async function createTodo(title: string) {
    try {
        const response = await axios.post('/api/todos', { title });
        return response.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
}

export async function deleteTodo(id: number) {
    try {
        const response = await axios.delete(`/api/todos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
}

export async function updateTodo(id: number, title: string) {
    try {
        const response = await axios.put(`/api/todos/${id}`, { id, title });
        return response.data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
}

export async function patchTodo(id: number, completed: boolean) {
    try {
        const response = await axios.patch(`/api/todos/${id}`, { completed });
        return response.data;
    } catch (error) {
        console.error('Error patching todo:', error);
        throw error;
    }
}
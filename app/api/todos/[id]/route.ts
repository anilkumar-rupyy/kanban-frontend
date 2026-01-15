import axios from "axios";
import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:4000/`;
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const accessToken = request.cookies.get('access_token')?.value || null;

    if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        console.log('Deleting todo with id:', params);
        const { id } = await params;
        const response = await axios.delete(`${BACKEND_URL}/todo/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('Deleted todo:', response.data);

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('Error deleting todo:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete todo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const accessToken = request.cookies.get('access_token')?.value || null;

    if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { title, completed } = await request.json();
        const { id } = await params;
        const response = await axios.put(`${BACKEND_URL}/todo/${id}`, { id, title }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        const updatedTodo = await axios.get(`${BACKEND_URL}/todo/${id}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });

        console.log('Updated todo:', updatedTodo.data);

        return new Response(JSON.stringify(updatedTodo.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('Error updating todo:', error);
        return new Response(JSON.stringify({ error: 'Failed to update todo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const accessToken = request.cookies.get('access_token')?.value || null;

    if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { completed } = await request.json();
        const { id } = await params;
        const response = await axios.patch(`${BACKEND_URL}/todo/${id}`, { id, completed }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        const patchedTodo = await axios.get(`${BACKEND_URL}/todo/${id}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });

        return new Response(JSON.stringify(patchedTodo.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('Error patching todo:', error);
        return new Response(JSON.stringify({ error: 'Failed to patch todo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}
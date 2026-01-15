import axios from "axios";
import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:4000/`;

export async function GET(request: NextRequest) {

    const accessToken = request.cookies.get('access_token')?.value || null;

    if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await axios.get(`${BACKEND_URL}todo/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Fetched todos:', response.data);

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('Error fetching todos:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch todos' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value || null;

    if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // get title from the request body
        const { title } = await request.json();
        console.log('Received title:', title);
        const response = await axios.post(`${BACKEND_URL}todo/`, {title: title}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Created todo:', response.data);

        return new Response(JSON.stringify(response.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('Error creating todo:', error);
        return new Response(JSON.stringify({ error: 'Failed to create todo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


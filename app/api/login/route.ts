import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';


const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:4000/`;
export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
  try {
    const { email, pass } = await request.json();

    // Basic validation
    if (!email || !pass) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Forward request to external backend
    const backendResponse = await fetch(`${BACKEND_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pass }),
    });

    const backendData = await backendResponse.json();
    console.log('Backend response data:', backendData);

    if (backendResponse.ok) {
      // Return success with access token
      cookieStore.set('access_token', backendData.access_token, { path: '/' }); 
      return NextResponse.json({
        message: backendData.message || 'Login successful',
        user: backendData.user,
        access_token: backendData.access_token,
      });
    } else {
      // Return error from backend
      return NextResponse.json(
        { error: backendData.message || 'Login failed' },
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
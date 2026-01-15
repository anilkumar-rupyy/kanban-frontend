import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';


const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:4000/`;
export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
  try {
    const { name, email, pass, confirmPass } = await request.json();

    // Basic validation
    if (!name || !email || !pass || !confirmPass) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (pass !== confirmPass) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Forward request to external backend
    const backendResponse = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, pass }),
    });

    const backendData = await backendResponse.json();
    console.log('Backend response data:', backendData);

    if (backendResponse.ok) {
      // Return success with access token if present
      cookieStore.set('access_token', backendData.access_token, { path: '/' });
      return NextResponse.json({
        message: backendData.message || 'Registration successful',
        user: backendData.user,
        accessToken: backendData.access_token,
      });
    } else {
      // Return error from backend
      return NextResponse.json(
        { error: backendData.message || 'Registration failed' },
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
  const cookie = req.cookies.get('access_token');

  if (!cookie && req.nextUrl.pathname.startsWith('/todos')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  console.log('Token from cookies:', token); // Логируем токен

  const protectedPaths = ['/dashboard'];
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      console.log('No token found, redirecting to /login'); // Логируем перенаправление
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Проверяем валидность токена
    try {
      const response = await fetch(`${process.env.API_URL}/api/token/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        console.log('Invalid token, redirecting to /login'); // Логируем невалидный токен
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error verifying token:', error); // Логируем ошибку
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
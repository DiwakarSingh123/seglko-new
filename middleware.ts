import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nextAction = request.headers.get('next-action');

  // Intercept bot scanners sending dummy/invalid Server Action IDs like "x"
  if (nextAction && (nextAction === 'x' || nextAction.length < 10)) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

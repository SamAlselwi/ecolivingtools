import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

  // Check the protocol via the x-forwarded-proto header (commonly set by proxies)
  if(process.env.NODE_ENV === 'production'){
    const protocol = req.headers.get('x-forwarded-proto') || req.nextUrl.protocol;
    if (protocol === 'http' || protocol === 'http:') {
      const url = req.nextUrl.clone();
      url.protocol = 'https:';
      return NextResponse.redirect(url, 308);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_COUNTRIES = ['ae', 'sa', 'us', 'gb', 'de', 'nl', 'au'];
const DEFAULT_COUNTRY = 'ae';
const EXCLUDED_PATHS = ['auth', 'api', '_next', 'favicon.ico', 'sitemap.xml', 'robots.txt'];

function detectCountry(request: NextRequest): string {
  const geoCountry = (request as any).geo?.country?.toLowerCase();
  if (geoCountry && SUPPORTED_COUNTRIES.includes(geoCountry)) {
    return geoCountry;
  }
  
  const urlCountry = request.nextUrl.pathname.split('/')[1];
  if (urlCountry && SUPPORTED_COUNTRIES.includes(urlCountry)) {
    return urlCountry;
  }
  
  const cookieCountry = request.cookies.get('preferred-country')?.value;
  if (cookieCountry && SUPPORTED_COUNTRIES.includes(cookieCountry)) {
    return cookieCountry;
  }
  
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLang = acceptLanguage.split(',')[0].split('-')[1]?.toLowerCase();
    if (browserLang && SUPPORTED_COUNTRIES.includes(browserLang)) {
      return browserLang;
    }
  }
  
  return DEFAULT_COUNTRY;
}

// ✅ Change: "middleware" to "proxy"
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  if (EXCLUDED_PATHS.includes(firstSegment)) {
    return NextResponse.next();
  }
  
  if (firstSegment && SUPPORTED_COUNTRIES.includes(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set('preferred-country', firstSegment, { maxAge: 30 * 24 * 60 * 60 });
    return response;
  }
  
  if (pathname === '/') {
    const country = detectCountry(request);
    const response = NextResponse.redirect(new URL(`/${country}`, request.url));
    response.cookies.set('preferred-country', country, { maxAge: 30 * 24 * 60 * 60 });
    return response;
  }
  
  const country = detectCountry(request);
  const newPathname = `/${country}${pathname}`;
  const response = NextResponse.redirect(new URL(newPathname, request.url));
  response.cookies.set('preferred-country', country, { maxAge: 30 * 24 * 60 * 60 });
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
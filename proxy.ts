import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ✅ Line 1: India add karo supported countries mein
const SUPPORTED_COUNTRIES = ['india', 'uae', 'usa', 'uk', 'singapore', 'australia', 'canada', 'ae', 'sa', 'us', 'gb', 'de', 'nl', 'au'];

// ✅ Line 2: Default country 'india' rakho
const DEFAULT_COUNTRY = 'india';  // Changed from 'uae' to 'india'

const EXCLUDED_PATHS = ['auth', 'api', '_next', 'favicon.ico', 'sitemap.xml', 'robots.txt'];

function detectCountry(request: NextRequest): string {
  const geoCountry = (request as any).geo?.country?.toLowerCase();
  // Map geo country codes to your country codes
  const geoMap: Record<string, string> = {
    'ae': 'uae',
    'sa': 'uae',
    'us': 'usa',
    'gb': 'uk',
    'de': 'uae',
    'nl': 'uae',
    'au': 'australia',
    'ca': 'canada',
    'in': 'india',      
    'sg': 'singapore',
  };
  
  if (geoCountry && geoMap[geoCountry]) {
    return geoMap[geoCountry];
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
    const langMap: Record<string, string> = {
      'ae': 'uae', 'sa': 'uae', 'us': 'usa', 'gb': 'uk',
      'au': 'australia', 'ca': 'canada', 'in': 'india', 'sg': 'singapore'
    };
    if (browserLang && langMap[browserLang]) {
      return langMap[browserLang];
    }
  }
  
  return DEFAULT_COUNTRY;
}

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
  
  // Don't redirect / - serve normal homepage
  if (pathname === '/') {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
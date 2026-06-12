'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';

const COUNTRIES = [
  { code: 'india', name: 'India', flag: '🇮🇳', currency: 'INR', market: '🇮🇳 Primary Market' },
  { code: 'uae', name: 'UAE', flag: '🇦🇪', currency: 'AED', market: '🇦🇪 GCC Hub' },
  { code: 'usa', name: 'USA', flag: '🇺🇸', currency: 'USD', market: '🇺🇸 North America' },
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', market: '🇬🇧 Europe' },
  { code: 'germany', name: 'Germany', flag: '🇩🇪', currency: 'EUR', market: '🇩🇪 EU Central' },
  { code: 'australia', name: 'Australia', flag: '🇦🇺', currency: 'AUD', market: '🇦🇺 Asia Pacific' },
];

export function CountrySelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const countryCode = pathSegments[0];
    const found = COUNTRIES.find(c => c.code === countryCode);
    if (found) {
      setSelectedCountry(found);
    } else {
      const cookieCountry = document.cookie
        .split('; ')
        .find(row => row.startsWith('preferred-country='))
        ?.split('=')[1];
      if (cookieCountry) {
        const cookieFound = COUNTRIES.find(c => c.code === cookieCountry);
        if (cookieFound) setSelectedCountry(cookieFound);
      }
    }
  }, [pathname]);

  const switchCountry = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
    document.cookie = `preferred-country=${country.code}; path=/; max-age=${30 * 24 * 60 * 60}`;
    
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentPath = pathSegments.slice(1).join('/');
    const newPath = currentPath ? `/${country.code}/${currentPath}` : `/${country.code}`;
    router.push(newPath);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-400 transition-all duration-300"
      >
        <span className="text-xl">{selectedCountry.flag}</span>
        <span className="text-sm font-semibold text-slate-700 hidden sm:inline">{selectedCountry.name}</span>
        <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 z-50 rounded-2xl border border-emerald-100 bg-white shadow-2xl shadow-emerald-500/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-emerald-600 border-b border-emerald-100 mb-1">Select Market</div>
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => switchCountry(country)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    selectedCountry.code === country.code
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                      : 'hover:bg-emerald-50'
                  }`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{country.name}</div>
                    <div className={`text-xs ${selectedCountry.code === country.code ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {country.market} • {country.currency}
                    </div>
                  </div>
                  {selectedCountry.code === country.code && (
                    <div className="w-2 h-2 rounded-full bg-white shadow-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
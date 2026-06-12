'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Building, MapPin } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    position: 'Procurement Head',
    company: 'Gulf Spice Trading LLC',
    country: 'Dubai, UAE',
    flag: '🇦🇪',
    content: 'Epic Legends has been our cumin and fennel supplier for three years. Consistent grade, on-time FCL, paperwork always clean at Jebel Ali. Their quality control is exceptional.',
    rating: 5,
    image: '🌶️',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    position: 'Category Manager',
    company: 'Asian Foods Distribution',
    country: 'London, UK',
    flag: '🇬🇧',
    content: 'We onboarded Epic Legends for our private-label turmeric and chilli range. Their HACCP documentation cleared our retail audit in week one. Highly professional team.',
    rating: 5,
    image: '🟡',
  },
  {
    id: 3,
    name: 'Mohammed Al-Qahtani',
    position: 'Director',
    company: 'Riyadh Wholesale Foods',
    country: 'Riyadh, Saudi Arabia',
    flag: '🇸🇦',
    content: 'Pink salt & dehydrated onion ranges for our HORECA channel. Flexible MOQ, competitive pricing on 40\'HC reefer containers. Will continue long-term partnership.',
    rating: 5,
    image: '🧂',
  },
  {
    id: 4,
    name: 'David Chen',
    position: 'Import Manager',
    company: 'Asia Pacific Spices',
    country: 'Singapore',
    flag: '🇸🇬',
    content: 'The quality of black pepper from Epic Legends is outstanding. Consistent supply and excellent packaging. Their team understands international shipping requirements perfectly.',
    rating: 5,
    image: '⚫',
  },
  {
    id: 5,
    name: 'Mark Williams',
    position: 'Purchasing Director',
    company: 'European Food Ingredients',
    country: 'Rotterdam, Netherlands',
    flag: '🇳🇱',
    content: 'Cardamom and clove quality exceeded our expectations. Documentation is always complete and customs clearance is smooth. A reliable partner for EU market.',
    rating: 4,
    image: '🟢',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // ✅ Fix: Use useEffect with cleanup for resize event
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    // Set initial value
    updateVisibleCount();

    // Add event listener with cleanup
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []); // ✅ Empty dependency array - runs only once

  const nextSlide = () => {
    if (currentIndex + visibleCount < TESTIMONIALS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, TESTIMONIALS.length - visibleCount));
    }
  };

  const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Global Partners
            </span>{' '}
            Say
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Trusted by importers and distributors across 25+ countries
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-emerald-200 mb-3" />

                {/* Content */}
                <p className="text-slate-600 leading-relaxed mb-5 line-clamp-4">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-emerald-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500">{testimonial.position}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Building className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-slate-600">{testimonial.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">{testimonial.flag} {testimonial.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {TESTIMONIALS.length > visibleCount && (
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white border border-emerald-200 hover:bg-emerald-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-emerald-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white border border-emerald-200 hover:bg-emerald-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-emerald-600" />
              </button>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-600">25+</div>
            <div className="text-sm text-slate-500">Countries Served</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-600">50+</div>
            <div className="text-sm text-slate-500">Happy Clients</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-600">99%</div>
            <div className="text-sm text-slate-500">Client Retention</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-emerald-600">10+</div>
            <div className="text-sm text-slate-500">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
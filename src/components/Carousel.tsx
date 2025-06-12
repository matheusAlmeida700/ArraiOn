import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: number;
  imageContainer: string;
}

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    { id: 1, imageContainer: "bg-[url('/slide1.png')]" },
    { id: 2, imageContainer: "bg-[url('/slide2.png')]" },
    { id: 3, imageContainer: "bg-[url('/slide3.png')]" },
    { id: 4, imageContainer: "bg-[url('/slide4.png')]" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-[500px] flex items-center">
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 bg-junina-brown bg-opacity-70 text-junina-white p-2 rounded-full hover:bg-opacity-90 transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 bg-junina-brown bg-opacity-70 text-junina-white p-2 rounded-full hover:bg-opacity-90 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slides */}
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`w-full h-full flex-shrink-0 bg-cover bg-center ${slide.imageContainer}`}
            />
          ))}
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-junina-white"
                  : "bg-junina-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

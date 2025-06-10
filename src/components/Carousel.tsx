
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  content: string;
  imageContainer: string;
}

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "Bem-vindo ao ArraiáON!",
      content: "Sua plataforma junina favorita chegou! Diversão garantida enquanto você espera na fila.",
      imageContainer: "slide-image-1"
    },
    {
      id: 2,
      title: "Jogos Arretados",
      content: "Acumule XP jogando nossos joguinhos temáticos e ganhe vouchers especiais!",
      imageContainer: "slide-image-2"
    },
    {
      id: 3,
      title: "Festa Completa",
      content: "Tudo que você precisa para aproveitar o melhor da festa junina está aqui!",
      imageContainer: "slide-image-3"
    }
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
    <div className="relative w-full max-w-6xl mx-auto bg-junina-orange rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-96 flex items-center">
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
        <div className="w-full h-full flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.id} className="w-full h-full flex-shrink-0 flex items-center justify-between px-16">
              <div className="flex-1 text-junina-white pr-8">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl leading-relaxed">{slide.content}</p>
              </div>
              
              {/* Placeholder for slide image */}
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-64 bg-junina-yellow rounded-lg flex items-center justify-center border-4 border-junina-white">
                  <span className="text-junina-brown text-lg font-semibold">
                    Imagem {slide.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-junina-white' : 'bg-junina-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

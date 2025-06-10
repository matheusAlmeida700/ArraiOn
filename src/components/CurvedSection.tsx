
import React from 'react';

const CurvedSection = () => {
  return (
    <div className="relative mt-16">
      {/* Curved top using SVG for perfect curve */}
      <div className="relative">
        <svg 
          viewBox="0 0 1200 100" 
          className="w-full h-20 fill-[#F4A300]"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C600,0 600,0 1200,100 L1200,100 L0,100 Z" />
        </svg>
      </div>
      
      {/* Main content section */}
      <div className="bg-junina-orange py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-junina-brown mb-8 flex items-center justify-center">
            Enquanto a fila anda, a diversão não para!
          </h2>
          
          <div className="bg-orange-py-16 px-8 bg-opacity-20 rounded-lg p-8 mb-8">
            <p className="text-xl text-junina-brown leading-relaxed font-medium">
              Ô trem bão, sô! Bem-vindo ao ArraiáON, a plataforma que transforma a sua 
              espera numa festança! Enquanto tu tá na fila, se divirta com nossos joguinhos 
              arretados, acumule XP e garanta seu voucher pra aproveitar ainda mais o arraiá. 
              Bata o chapéu e vem brincar com a gente! Simbora aproveitar, sô!
            </p>
          </div>
          
          <button className="bg-junina-brown text-junina-white px-12 py-4 rounded-lg text-xl font-bold btn-junina transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            BORA MEU FI!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurvedSection;

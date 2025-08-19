import React from 'react';

interface OGImageProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const OGImage: React.FC<OGImageProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div 
      className={`relative w-[1200px] h-[630px] bg-black flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-20">
        <h1 className="text-6xl font-satoshi font-light text-warm-white mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-2xl text-warm-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        
        {/* Author info */}
        <div className="mt-12 pt-8 border-t border-warm-white/20">
          <p className="text-xl text-warm-white/60 font-light">
            Arran Miller-Strange
          </p>
          <p className="text-lg text-warm-white/40 font-light mt-1">
            Full-stack Developer & Web Designer
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-warm-white/20 rounded-full" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border border-warm-white/10 rounded-full" />
    </div>
  );
};

export default OGImage;

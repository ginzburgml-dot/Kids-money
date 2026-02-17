
import React from 'react';

const Confetti: React.FC = () => {
  const pieces = Array.from({ length: 40 });
  const colors = ['bg-yellow-400', 'bg-blue-400', 'bg-red-400', 'bg-green-400', 'bg-pink-400', 'bg-purple-400'];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 3;
        const size = 8 + Math.random() * 8;

        return (
          <div
            key={i}
            className={`absolute rounded-sm animate-bounce ${color}`}
            style={{
              left: `${left}%`,
              top: '-5%',
              width: `${size}px`,
              height: `${size}px`,
              animation: `confetti-fall ${duration}s linear ${delay}s infinite`,
              opacity: 0.8
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Confetti;

import React, { useEffect, useRef, useState } from 'react';

interface NeonHeaderProps {
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}

export const NeonHeader: React.FC<NeonHeaderProps> = ({
  title,
  as: Tag = 'h2',
  className = '',
  id,
}) => {
  const [flickering, setFlickering] = useState(false);
  const flickerTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.45) {
        setFlickering(true);
        clearTimeout(flickerTimeout.current);
        flickerTimeout.current = setTimeout(() => setFlickering(false), 400);
      }
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(flickerTimeout.current);
    };
  }, []);

  // Split title into words and letters for sequential ignition and ripple wave
  const words = title.toUpperCase().split(' ');
  let letterIndex = 0;

  return (
    <Tag
      id={id}
      aria-label={title}
      className={`neon-title ${flickering ? 'flick' : ''} my-8 md:my-16 ${className}`}
    >
      {words.map((word, wordIdx) => {
        const letters = Array.from(word);
        return (
          <React.Fragment key={wordIdx}>
            <span className="neon-w" aria-hidden="true">
              {letters.map((char) => {
                const i = letterIndex++;
                return (
                  <span
                    key={i}
                    className="neon-l"
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {wordIdx < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

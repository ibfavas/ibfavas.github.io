import React, { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  triggerOnHover?: boolean;
}

const CIPHER_CHARS = '01#$*@&%_!<>X?Z7';

export const DecryptText: React.FC<Props> = ({
  text,
  className = '',
  speed = 25,
  maxIterations = 10,
  triggerOnHover = true
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number | null>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const totalLength = text.length;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join('');
      });

      iteration += 1 / (maxIterations / totalLength);

      if (iteration >= totalLength) {
        setDisplayText(text);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, speed);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  return (
    <span
      className={`font-mono cursor-default inline-block ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) startAnimation();
      }}
    >
      {displayText}
    </span>
  );
};
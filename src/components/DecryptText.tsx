import React, { useState, useEffect, useRef } from 'react';

import { useReducedMotion } from '../lib/useReducedMotion';

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
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  const startAnimation = () => {
    if (reduced || timer.current !== null) return;

    let iteration = 0;
    const totalLength = text.length;

    timer.current = window.setInterval(() => {
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
        if (timer.current !== null) window.clearInterval(timer.current);
        timer.current = null;
      }
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text);
    startAnimation();
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [text, reduced]);

  return (
    <span
      className={`font-mono cursor-default inline-block ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) startAnimation();
      }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reduced ? text : displayText}</span>
    </span>
  );
};
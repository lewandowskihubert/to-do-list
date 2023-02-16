import React, { useRef, useEffect } from 'react';
import './animation.css';

interface HandwritingAnimationProps {
  children: React.ReactNode;
}

function HandwritingAnimation(props: HandwritingAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textEl = textRef.current;
    const textContent = textEl?.textContent;

    if (textEl && textContent) {
      textEl.textContent = '';

      const words = textContent.split(' ');

      words.forEach((word, wordIndex) => {
        const wordContainer = document.createElement('span');
        wordContainer.classList.add('word-container');
        textEl.appendChild(wordContainer);

        for (let i = 0; i < word.length; i++) {
          const charEl = document.createElement('span');
          charEl.textContent = word[i];
          wordContainer.appendChild(charEl);
        }

        if (wordIndex < words.length - 1) {
          const spaceEl = document.createElement('span');
          spaceEl.textContent = ' ';
          textEl.appendChild(spaceEl);
        }
      });

      let delay = 0;
      const charEls = textEl.querySelectorAll('.word-container span');
      charEls.forEach(charEl => {
        (charEl as HTMLElement).style.animationDelay = `${delay}s`;
        delay += 0.1;
      });
    }
  }, []);

  return (
    <div ref={textRef} className="HandwritingAnimation">
      {props.children}
    </div>
  );
}

export default HandwritingAnimation;
import React, { useEffect, useState } from 'react';

const NumberAnimation = ({ score, tscore }) => {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const animationDuration = 2000; // Animation duration in milliseconds
    const animationStep = Math.ceil(score / animationDuration);
    let tempScore = 0;

    const startAnimation = () => {
      const interval = setInterval(() => {
        if (tempScore < score) {
          tempScore += animationStep;
          setCurrentScore(tempScore);
        } else {
          setCurrentScore(score);
          clearInterval(interval);
        }
      }, 1);
    };

    startAnimation();
  }, [score]);

  const percentage = Math.round((currentScore / parseInt(tscore)) * 100);

  return (
    <div style={{ display: 'flex', color: 'green', justifyContent: 'center' }}>
      <div style={{ alignSelf: 'center' }}>Your Score:</div>
      <div style={{ fontSize: 30, marginLeft: 8 }}>{currentScore}%</div>
    </div>
  );
};

export default NumberAnimation;

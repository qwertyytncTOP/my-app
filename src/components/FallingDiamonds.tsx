import  { useEffect } from 'react';

const CelebrationEffect = () => {
  // Создание алмазов и звезд с интервалом
  const createDiamondsAndStars = () => {
    for (let i = 0; i < 120; i++) {
      setTimeout(() => {
        // Алмазы
        const diamond = document.createElement('div');
        diamond.className = 'diamond';
        diamond.textContent = '\u{1F48E}';
        diamond.style.left = `${Math.random() * window.innerWidth}px`;
        diamond.style.top = `-${Math.random() * 100}px`;
        diamond.style.animationDuration = `5s`;
        document.body.appendChild(diamond);

        // Звезды
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '\u{1F31F}';
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `-${Math.random() * 100}px`;
        star.style.animationDuration = `5s`;
        document.body.appendChild(star);
      }, i * 100); // Задержка между созданием каждого алмаза и звезды
    }
  };

  useEffect(() => {
    createDiamondsAndStars();
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents: "none", // Чтобы не мешать взаимодействию с другими элементами
      zIndex: 9999, // Убедитесь, что он находится поверх других элементов
    }}>
      
    </div>
  );
};

export default CelebrationEffect;

import React, { useEffect, useRef } from 'react';
import './film.css';

export const Film = () => {
  const playerRef = useRef(null);
  const localStorageVideo = localStorage.getItem("filmVideo");

  useEffect(() => {
    const handleResize = () => {
      if (playerRef.current) {
        const player = playerRef.current;
        const playerWrapper = player.parentNode;

        // Calcula la altura y anchura de la ventana
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Centra el reproductor de video en pantalla completa
        player.style.position = 'absolute';
        player.style.top = '50%';
        player.style.left = '50%';
        player.style.transform = 'translate(-50%, -50%)';

        // Calcula la altura en función del ancho de la ventana
        const aspectRatio = 9 / 16; // Relación de aspecto del video (16:9)
        let width = windowWidth;
        let height = windowWidth * aspectRatio;

        // Si la altura calculada es mayor que la altura de la ventana, ajusta la altura
        if (height > windowHeight) {
          height = windowHeight;
          width = height / aspectRatio;
        }

        player.style.width = `${width}px`;
        player.style.height = `${height}px`;
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="film-wrapper">
      <iframe
        src={localStorageVideo}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="4 Houses 1 Spirit"
        ref={playerRef}
      ></iframe>
    </div>
  );
};


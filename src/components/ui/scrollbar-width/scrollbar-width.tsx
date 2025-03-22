import React, { useEffect } from 'react';

export const ScrollbarWidth = () => {
  useEffect(() => {
    // Создаем элемент div
    const scrollDiv = document.createElement('div');

    // Устанавливаем стили для элемента
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';

    // Добавляем элемент в DOM
    document.body.appendChild(scrollDiv);

    // Вычисляем ширину полосы прокрутки
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Создаем CSS-переменную
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    // Удаляем элемент из DOM
    document.body.removeChild(scrollDiv);
  }, []); 

  return null; // Компонент ничего не рендерит
};


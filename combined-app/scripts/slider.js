document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-inner');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let index = 0;
  
    next.addEventListener('click', () => {
      if (index < 2) {
        index++;
        slider.style.transform = `translateX(-${index * 100}%)`;
      }
    });
  
    prev.addEventListener('click', () => {
      if (index > 0) {
        index--;
        slider.style.transform = `translateX(-${index * 100}%)`;
      }
    });
  });
  
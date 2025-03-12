
import { useEffect, useState } from 'react';

export const useSlideNavigation = (totalSlides: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentSlide(newIndex);
    document.getElementById(`slide-${newIndex}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      }
    };

    const handleScroll = () => {
      const slides = document.querySelectorAll('.slide');
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setCurrentSlide(index);
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSlide, totalSlides]);

  return { currentSlide, goToSlide };
};

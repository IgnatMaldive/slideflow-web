
import { useSlideNavigation } from "@/hooks/useSlideNavigation";

const SLIDES = [
  {
    title: "Welcome to the Future",
    description: "A seamless blend of web and presentation technology",
  },
  {
    title: "Smooth Transitions",
    description: "Navigate with arrow keys or simply scroll to move between slides",
  },
  {
    title: "Responsive Design",
    description: "Perfect presentation on any device, any screen size",
  },
  {
    title: "Built for Performance",
    description: "Lightning-fast transitions and butter-smooth animations",
  },
];

const Index = () => {
  const { currentSlide } = useSlideNavigation(SLIDES.length);

  return (
    <main className="w-full min-h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden">
      {SLIDES.map((slide, index) => (
        <section
          key={index}
          id={`slide-${index}`}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="slide-content">
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-description">{slide.description}</p>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Index;

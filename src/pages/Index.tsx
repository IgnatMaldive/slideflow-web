import { useEffect, useState } from "react";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { parseMarkdownToSlides } from "@/utils/markdownParser";
import { useNavigate } from "react-router-dom";

type SlideSection = {
  title: string;
  description: string[];
  level: number;
};

const Index = () => {
  const [slides, setSlides] = useState<SlideSection[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentSlide } = useSlideNavigation(slides.length);
  const navigate = useNavigate();

  useEffect(() => {
    const content = localStorage.getItem("presentationContent");
    if (!content) {
      navigate("/create");
      return;
    }

    const parsedSlides = parseMarkdownToSlides(content);
    setSlides(parsedSlides);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading presentation...</div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden">
      {slides.map((slide, index) => (
        <section
          key={index}
          id={`slide-${index}`}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="slide-content">
            <div className={`text-sm uppercase tracking-wider mb-2 text-muted-foreground`}>
              Section {index + 1}
            </div>
            <h2 className="slide-title">{slide.title}</h2>
            <div className="slide-description">
              {slide.description.map((desc, i) => {
                if (desc.startsWith('**') && desc.endsWith('**')) {
                  return (
                    <h3 key={i} className="text-2xl font-semibold mt-6 mb-3">
                      {desc.substring(2, desc.length - 2)}
                    </h3>
                  );
                }
                else if (desc.startsWith('- ')) {
                  return (
                    <div key={i} className="flex items-start space-x-2 my-1.5">
                      <span className="text-primary mt-1.5">•</span>
                      <p className="text-lg">{desc.substring(2)}</p>
                    </div>
                  );
                }
                return <p key={i} className="my-1.5">{desc}</p>;
              })}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Index;

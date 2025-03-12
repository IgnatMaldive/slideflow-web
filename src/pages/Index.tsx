
import { useEffect, useState } from "react";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { fetchMarkdownContent } from "@/services/contentService";
import { parseMarkdownToSlides } from "@/utils/markdownParser";

// Update the type to include the level property
type SlideSection = {
  title: string;
  description: string[];
  level: number;
};

const Index = () => {
  // Update the state type to use SlideSection
  const [slides, setSlides] = useState<SlideSection[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentSlide } = useSlideNavigation(slides.length);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const markdownContent = await fetchMarkdownContent();
        const parsedSlides = parseMarkdownToSlides(markdownContent);
        setSlides(parsedSlides);
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

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
              {slide.level === 1 ? 'Section' : slide.level === 2 ? 'Sub-section' : 'Topic'}
            </div>
            <h2 className="slide-title">{slide.title}</h2>
            <div className="slide-description">
              {slide.description.map((desc, i) => {
                // Check if it's a bullet point
                if (desc.startsWith('- ')) {
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

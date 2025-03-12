
type SlideSection = {
  title: string;
  description: string[];
  level: number;
};

export const parseMarkdownToSlides = (markdown: string): SlideSection[] => {
  const lines = markdown.trim().split('\n');
  const slides: SlideSection[] = [];
  
  let currentSlide: SlideSection | null = null;
  
  for (const line of lines) {
    // Check if line is a heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headingMatch) {
      // If we already have a current slide, save it before creating a new one
      if (currentSlide) {
        slides.push(currentSlide);
      }
      
      // Create a new slide with the heading
      currentSlide = {
        title: headingMatch[2].trim(),
        description: [],
        level: headingMatch[1].length,
      };
    } 
    // Check if line is a list item or regular text and not empty
    else if (line.trim() && currentSlide) {
      // Add to current slide description
      const trimmedLine = line.trim();
      if (trimmedLine) {
        currentSlide.description.push(trimmedLine);
      }
    }
  }
  
  // Add the last slide if it exists
  if (currentSlide) {
    slides.push(currentSlide);
  }
  
  return slides;
};

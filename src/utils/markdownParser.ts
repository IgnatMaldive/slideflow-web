
export type SlideSection = {
  title: string;
  description: string[];
  level: number;
};

export const parseMarkdownToSlides = (markdown: string): SlideSection[] => {
  const lines = markdown.trim().split('\n');
  const slides: SlideSection[] = [];
  
  let currentSlide: SlideSection | null = null;
  let currentSubsectionTitle: string | null = null;
  
  for (const line of lines) {
    // Check if line is a heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      
      // If it's a top-level heading (## with level 2, representing section 1-10)
      if (level === 2) {
        // If we already have a current slide, save it before creating a new one
        if (currentSlide) {
          slides.push(currentSlide);
        }
        
        // Create a new slide with the top-level heading
        currentSlide = {
          title: title,
          description: [],
          level: level,
        };
        currentSubsectionTitle = null;
      } 
      // If it's a subsection heading and we have a current slide
      else if (level === 3 && currentSlide) {
        // Add the subsection heading as a bold content item
        currentSubsectionTitle = title;
        currentSlide.description.push(`**${title}**`);
      }
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

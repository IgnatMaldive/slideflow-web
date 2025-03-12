
import { type SlideSection } from "@/utils/markdownParser";

interface PreviewSlideProps {
  slide: SlideSection;
  font?: string;
  colorScheme?: string;
}

const PreviewSlide = ({ slide, font = "inter", colorScheme = "default" }: PreviewSlideProps) => {
  // Get color classes based on theme
  const getColorClasses = () => {
    switch (colorScheme) {
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      case "purple":
        return "text-purple-600";
      case "amber":
        return "text-amber-600";
      default:
        return "text-primary";
    }
  };

  // Get font classes
  const getFontClasses = () => {
    switch (font) {
      case "georgia":
        return "font-serif";
      case "mono":
        return "font-mono";
      default:
        return "font-sans";
    }
  };

  const colorClass = getColorClasses();
  const fontClass = getFontClasses();

  return (
    <div className={`p-6 h-full ${fontClass}`}>
      <h2 className={`text-xl font-bold mb-4 ${colorClass}`}>{slide.title}</h2>
      <div className="space-y-2 text-sm">
        {slide.description.map((desc, i) => {
          if (desc.startsWith('**') && desc.endsWith('**')) {
            return (
              <h3 key={i} className={`font-semibold mt-4 mb-2 ${colorClass}`}>
                {desc.substring(2, desc.length - 2)}
              </h3>
            );
          }
          if (desc.startsWith('- ')) {
            return (
              <div key={i} className="flex items-start space-x-2">
                <span className={colorClass}>•</span>
                <p>{desc.substring(2)}</p>
              </div>
            );
          }
          return <p key={i}>{desc}</p>;
        })}
      </div>
    </div>
  );
};

export default PreviewSlide;

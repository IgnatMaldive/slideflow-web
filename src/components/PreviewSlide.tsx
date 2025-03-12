
import { type SlideSection } from "@/utils/markdownParser";

interface PreviewSlideProps {
  slide: SlideSection;
}

const PreviewSlide = ({ slide }: PreviewSlideProps) => {
  return (
    <div className="p-6 h-full">
      <h2 className="text-xl font-bold mb-4">{slide.title}</h2>
      <div className="space-y-2 text-sm">
        {slide.description.map((desc, i) => {
          if (desc.startsWith('**') && desc.endsWith('**')) {
            return (
              <h3 key={i} className="font-semibold mt-4 mb-2">
                {desc.substring(2, desc.length - 2)}
              </h3>
            );
          }
          if (desc.startsWith('- ')) {
            return (
              <div key={i} className="flex items-start space-x-2">
                <span>•</span>
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

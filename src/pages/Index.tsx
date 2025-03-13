
import { useEffect, useState, useRef } from "react";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { parseMarkdownToSlides } from "@/utils/markdownParser";
import { exportAsHTML, exportAsPDF } from "@/utils/exportUtils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, FileText, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { type SlideSection } from "@/utils/markdownParser";

const Index = () => {
  const [slides, setSlides] = useState<SlideSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [menuOpacity, setMenuOpacity] = useState(0);
  const [font, setFont] = useState("inter");
  const [colorScheme, setColorScheme] = useState("default");
  const { currentSlide, slideDirection } = useSlideNavigation(slides.length);
  const navigate = useNavigate();
  const { toast } = useToast();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const content = localStorage.getItem("presentationContent");
    const savedFont = localStorage.getItem("presentationFont");
    const savedColorScheme = localStorage.getItem("presentationColorScheme");
    
    if (!content) {
      navigate("/create");
      return;
    }

    if (savedFont) setFont(savedFont);
    if (savedColorScheme) setColorScheme(savedColorScheme);

    const parsedSlides = parseMarkdownToSlides(content);
    setSlides(parsedSlides);
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowMenu(true);
      setMenuOpacity(1);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setMenuOpacity(0);
        setTimeout(() => setShowMenu(false), 500); // Hide after fade out
      }, 3000);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getColorClasses = () => {
    switch (colorScheme) {
      case "blue":
        return {
          primary: "text-blue-600",
          background: "from-blue-50 to-blue-100/50",
          accent: "bg-blue-600"
        };
      case "green":
        return {
          primary: "text-green-600",
          background: "from-green-50 to-green-100/50",
          accent: "bg-green-600"
        };
      case "purple":
        return {
          primary: "text-purple-600",
          background: "from-purple-50 to-purple-100/50",
          accent: "bg-purple-600"
        };
      case "amber":
        return {
          primary: "text-amber-600",
          background: "from-amber-50 to-amber-100/50",
          accent: "bg-amber-600"
        };
      default:
        return {
          primary: "text-primary",
          background: "from-background to-secondary/20",
          accent: "bg-primary"
        };
    }
  };

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

  const colorClasses = getColorClasses();
  const fontClasses = getFontClasses();

  const exportHTML = () => {
    try {
      exportAsHTML(slides, font, colorScheme);
      toast({
        title: "Export successful",
        description: "Your presentation has been exported as an HTML file",
      });
    } catch (error) {
      console.error("Error exporting HTML:", error);
      toast({
        title: "Export failed",
        description: "An error occurred while exporting the HTML file",
        variant: "destructive",
      });
    }
  };

  const exportPDF = () => {
    try {
      exportAsPDF();
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Export failed",
        description: "An error occurred while exporting to PDF",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading presentation...</div>
      </div>
    );
  }

  return (
    <main className={cn("w-full min-h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden", fontClasses)}>
      {/* Top Menu */}
      {showMenu && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 ease-in-out"
          style={{ opacity: menuOpacity }}
        >
          <div className="mx-auto max-w-screen-lg bg-background/80 backdrop-blur-sm border-b shadow-sm px-4 py-2 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate("/create")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={exportHTML}>
                <FileText className="h-4 w-4 mr-2" />
                Export HTML
              </Button>
              <Button variant="outline" size="sm" onClick={exportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Slides */}
      {slides.map((slide, index) => (
        <section
          key={index}
          id={`slide-${index}`}
          className={cn(
            `slide bg-gradient-to-b ${colorClasses.background}`,
            index === currentSlide ? 'active' : '',
            slideDirection ? `direction-${slideDirection}` : ''
          )}
        >
          <div className="slide-content">
            <div className="text-sm uppercase tracking-wider mb-2 text-muted-foreground">
              Section {index + 1} of {slides.length}
            </div>
            <h2 className={`slide-title ${colorClasses.primary}`}>{slide.title}</h2>
            <div className="slide-description">
              {slide.description.map((desc, i) => {
                if (desc.startsWith('**') && desc.endsWith('**')) {
                  return (
                    <h3 key={i} className={`text-2xl font-semibold mt-6 mb-3 ${colorClasses.primary}`}>
                      {desc.substring(2, desc.length - 2)}
                    </h3>
                  );
                }
                else if (desc.startsWith('- ')) {
                  return (
                    <div key={i} className="flex items-start space-x-2 my-1.5">
                      <span className={`${colorClasses.primary} mt-1.5`}>•</span>
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

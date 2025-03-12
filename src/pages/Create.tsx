
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseMarkdownToSlides } from "@/utils/markdownParser";
import PreviewSlide from "@/components/PreviewSlide";

const EXAMPLE_CONTENT = `## 1. Introduction\n### Overview\n- Key Point 1\n- Key Point 2`;

const Create = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleGeneratePresentation = () => {
    if (!content.trim()) return;
    // Store content in localStorage for now (we'll improve this later)
    localStorage.setItem("presentationContent", content);
    navigate("/presentation");
  };

  const loadExample = () => {
    setContent(EXAMPLE_CONTENT);
  };

  const previewSlides = content ? parseMarkdownToSlides(content) : [];

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create Your Presentation</h2>
            <Button variant="outline" onClick={loadExample}>
              Load Example
            </Button>
          </div>
          <Textarea
            placeholder="Paste your markdown content here..."
            className="min-h-[400px] font-mono"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            className="w-full"
            size="lg"
            onClick={handleGeneratePresentation}
            disabled={!content.trim()}
          >
            Generate Presentation
          </Button>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="aspect-video bg-background rounded-lg overflow-hidden">
            {previewSlides.length > 0 && (
              <PreviewSlide slide={previewSlides[0]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

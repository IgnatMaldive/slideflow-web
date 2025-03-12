
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseMarkdownToSlides } from "@/utils/markdownParser";
import PreviewSlide from "@/components/PreviewSlide";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE_CONTENT = `## 1. Introduction\n### Overview\n- Key Point 1\n- Key Point 2\n\n## 2. Problem Statement\n### Background\n- Issue 1\n- Issue 2\n\n## 3. Solution\n- Our approach\n- Benefits\n\n## 4. Features\n### Key Features\n- Feature 1\n- Feature 2\n\n## 5. Implementation\n### Timeline\n- Phase 1\n- Phase 2\n\n## 6. Results\n### Outcomes\n- Result 1\n- Result 2\n\n## 7. Case Studies\n- Example 1\n- Example 2\n\n## 8. Benefits\n### Business Value\n- Benefit 1\n- Benefit 2\n\n## 9. Next Steps\n- Future plans\n- Roadmap\n\n## 10. Conclusion\n- Summary\n- Call to action`;

const fontOptions = [
  { value: "inter", label: "Inter (Sans-serif)" },
  { value: "georgia", label: "Georgia (Serif)" },
  { value: "mono", label: "Monospace" },
];

const colorSchemes = [
  { value: "default", label: "Default", primary: "bg-primary", secondary: "bg-secondary" },
  { value: "blue", label: "Blue", primary: "bg-blue-600", secondary: "bg-blue-200" },
  { value: "green", label: "Green", primary: "bg-green-600", secondary: "bg-green-200" },
  { value: "purple", label: "Purple", primary: "bg-purple-600", secondary: "bg-purple-200" },
  { value: "amber", label: "Amber", primary: "bg-amber-600", secondary: "bg-amber-200" },
];

const Create = () => {
  const [content, setContent] = useState("");
  const [font, setFont] = useState("inter");
  const [colorScheme, setColorScheme] = useState("default");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGeneratePresentation = () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content before generating your presentation",
        variant: "destructive",
      });
      return;
    }
    
    // Store presentation settings in localStorage
    localStorage.setItem("presentationContent", content);
    localStorage.setItem("presentationFont", font);
    localStorage.setItem("presentationColorScheme", colorScheme);
    
    toast({
      title: "Presentation ready!",
      description: "Your presentation has been generated successfully",
    });
    
    navigate("/presentation");
  };

  const loadExample = () => {
    setContent(EXAMPLE_CONTENT);
    toast({
      title: "Example loaded",
      description: "Example content has been loaded into the editor",
    });
  };

  const previewSlides = content ? parseMarkdownToSlides(content) : [];

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Presentation</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Content</h2>
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
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Formatting Guidelines</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use <code className="bg-muted-foreground/20 px-1 rounded">##</code> for main sections (slides)</li>
              <li>• Use <code className="bg-muted-foreground/20 px-1 rounded">###</code> for subsections within a slide</li>
              <li>• Use <code className="bg-muted-foreground/20 px-1 rounded">-</code> for bullet points</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Slide Preview</h3>
                <div className="aspect-video bg-background rounded-lg overflow-hidden border shadow-sm">
                  {previewSlides.length > 0 ? (
                    <PreviewSlide slide={previewSlides[0]} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Add content to see a preview
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Typography</h3>
                <div className="grid gap-2">
                  <Label htmlFor="font">Font Family</Label>
                  <Select value={font} onValueChange={setFont}>
                    <SelectTrigger id="font">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Color Scheme</h3>
                <RadioGroup value={colorScheme} onValueChange={setColorScheme} className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                  {colorSchemes.map((scheme) => (
                    <div key={scheme.value} className="space-y-2">
                      <RadioGroupItem
                        value={scheme.value}
                        id={`color-${scheme.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${scheme.value}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <div className="flex gap-1 mb-2">
                          <div className={`w-4 h-4 rounded-full ${scheme.primary}`}></div>
                          <div className={`w-4 h-4 rounded-full ${scheme.secondary}`}></div>
                        </div>
                        <span className="text-xs">{scheme.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button
            className="w-full mt-6"
            size="lg"
            onClick={handleGeneratePresentation}
            disabled={!content.trim()}
          >
            Generate Presentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;

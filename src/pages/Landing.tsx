
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Layout } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6 space-y-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Present Your Ideas
          <span className="text-primary"> Beautifully</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground">
          Transform your markdown content into elegant, interactive presentations in seconds.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <FileText className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Simple Markdown</h3>
            <p className="text-muted-foreground">Write your presentation in familiar Markdown format — no complex tools required</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <Layout className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Beautiful Slides</h3>
            <p className="text-muted-foreground">Your content is automatically transformed into professionally styled presentation slides</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary mx-auto mb-4">
              <path d="M4 21a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7H4v7Z" />
              <path d="M15 8h5l-5-5v5Z" />
              <path d="M7 13h4" />
              <path d="M7 17h4" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Export Options</h3>
            <p className="text-muted-foreground">Save your presentation as HTML or PDF for sharing or offline use</p>
          </div>
        </div>
        
        <div className="pt-4">
          <Button asChild size="lg">
            <Link to="/create" className="space-x-2">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

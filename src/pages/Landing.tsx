
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6 space-y-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Present Your Ideas
          <span className="text-primary"> Beautifully</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground">
          Transform your markdown content into elegant, interactive presentations in seconds.
        </p>
        <div className="space-x-4">
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

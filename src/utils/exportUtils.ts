
/**
 * Utilities for exporting the presentation in different formats
 */

import { type SlideSection } from "./markdownParser";

/**
 * Exports the presentation as a standalone HTML file
 */
export const exportAsHTML = (
  slides: SlideSection[],
  font: string,
  colorScheme: string
) => {
  // Get the current CSS styles from stylesheets
  let cssContent = "";
  for (const sheet of document.styleSheets) {
    try {
      // Try to access the rules
      const rules = sheet.cssRules || sheet.rules;
      for (let i = 0; i < rules.length; i++) {
        cssContent += rules[i].cssText;
      }
    } catch (e) {
      console.warn("Cannot access stylesheet rules", e);
    }
  }

  // Get color classes based on theme
  const getColorClasses = (scheme: string) => {
    switch (scheme) {
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

  // Get font classes
  const getFontClasses = (fontChoice: string) => {
    switch (fontChoice) {
      case "georgia":
        return "font-serif";
      case "mono":
        return "font-mono";
      default:
        return "font-sans";
    }
  };

  const colorClasses = getColorClasses(colorScheme);
  const fontClasses = getFontClasses(font);

  // Create HTML slides content
  const slidesHTML = slides.map((slide, index) => {
    const slideContent = slide.description.map((desc, i) => {
      if (desc.startsWith('**') && desc.endsWith('**')) {
        return `<h3 class="text-2xl font-semibold mt-6 mb-3 ${colorClasses.primary}">
          ${desc.substring(2, desc.length - 2)}
        </h3>`;
      }
      if (desc.startsWith('- ')) {
        return `<div class="flex items-start space-x-2 my-1.5">
          <span class="${colorClasses.primary} mt-1.5">•</span>
          <p class="text-lg">${desc.substring(2)}</p>
        </div>`;
      }
      return `<p class="my-1.5">${desc}</p>`;
    }).join('\n');

    return `
      <section id="slide-${index}" class="slide bg-gradient-to-b ${colorClasses.background}">
        <div class="slide-content">
          <div class="text-sm uppercase tracking-wider mb-2 text-muted-foreground">
            Section ${index + 1} of ${slides.length}
          </div>
          <h2 class="slide-title ${colorClasses.primary}">${slide.title}</h2>
          <div class="slide-description">
            ${slideContent}
          </div>
        </div>
      </section>
    `;
  }).join('\n');

  // Create the HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Exported Presentation</title>
      <style>
        ${cssContent}
        /* Essential styles for the presentation */
        body {
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .slide {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 3rem 0;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
        .slide-content {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 1.5rem;
          width: 100%;
        }
        .slide-title {
          font-size: 2.5rem;
          font-weight: bold;
          letter-spacing: -0.025em;
          margin-bottom: 2rem;
        }
        .slide-description {
          font-size: 1.25rem;
          color: #4b5563;
          max-width: 48rem;
          margin-top: 0.5rem;
        }
        main {
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        .text-muted-foreground {
          color: #6b7280;
        }
        @media (min-width: 768px) {
          .slide-title {
            font-size: 3.75rem;
          }
        }
      </style>
    </head>
    <body class="${fontClasses}">
      <main>
        ${slidesHTML}
      </main>
      <script>
        // Simple navigation script
        document.addEventListener('DOMContentLoaded', function() {
          const slides = document.querySelectorAll('.slide');
          let currentSlide = 0;
          
          // Initialize all slides as active
          slides.forEach((slide) => {
            slide.querySelector('.slide-content').style.opacity = 1;
            slide.querySelector('.slide-content').style.transform = 'translateY(0)';
          });
          
          function goToSlide(index) {
            const newIndex = Math.max(0, Math.min(index, slides.length - 1));
            currentSlide = newIndex;
            document.getElementById('slide-' + newIndex).scrollIntoView({ behavior: 'smooth' });
          }
          
          function handleKeyDown(event) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
              goToSlide(currentSlide + 1);
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
              goToSlide(currentSlide - 1);
            }
          }
          
          window.addEventListener('keydown', handleKeyDown);
        });
      </script>
    </body>
    </html>
  `;

  // Create a Blob with the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Create a download link and trigger it
  const a = document.createElement('a');
  a.href = url;
  a.download = 'presentation.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Clean up
  URL.revokeObjectURL(url);
};

/**
 * Export as PDF (simplified client-side implementation)
 */
export const exportAsPDF = () => {
  // Alert the user about the limitations
  alert(
    "For the best PDF export results, please use the exported HTML file and print it to PDF using your browser's print functionality (Ctrl+P or Cmd+P)."
  );
};

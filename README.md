# Markdown to Web App

https://slideflow-web.vercel.app/

## Overview
This web app allows users to convert Markdown content into a structured slide presentation. The app ensures a clean and organized experience by limiting slides to main sections while embedding subsections within each slide. Additionally, users can customize typography and colors before generating their presentation.

## Features
- **Automatic Slide Structuring**: Generates exactly 10 slides based on top-level headings, embedding subsections within each slide.
- **Multi-Page Flow**:
  - **Landing Page**: Introduces the app with a clear call-to-action.
  - **Creation Page**: Allows users to input Markdown content, select sample templates, and configure typography and colors.
  - **Presentation Page**: Displays the generated slides with a smooth user interface.
- **Subtle Top Menu**: Appears on mouse movement and includes export options.
- **Export Options**:
  - **Standalone HTML**
  - **Static PDF**
- **Local Storage Persistence**: Saves user input for seamless transitions.

## Installation
```sh
# Clone the repository
git clone https://github.com/yourusername/presentation-app.git
cd presentation-app

# Install dependencies
npm install

# Run the app
npm start
```

## Usage
1. Open the app and click **Get Started**.
2. Enter or upload Markdown content.
3. Select typography and color preferences.
4. Generate and review the presentation.
5. Use the top menu to export as HTML or PDF.

## Development Notes
- The markdown parser was modified to group subsections within main slides.
- The `SlideSection` type is now exported from `markdownParser.ts` to avoid import errors.
- The top menu smoothly appears/disappears based on user interaction.
- A potential backend enhancement could improve data persistence.

## Contributing
Feel free to submit pull requests or report issues in the GitHub repository.

## License
[MIT License](LICENSE)


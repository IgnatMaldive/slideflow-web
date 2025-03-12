
export const fetchMarkdownContent = async (): Promise<string> => {
  try {
    const response = await fetch('/contents.md');
    if (!response.ok) {
      throw new Error('Failed to fetch markdown content');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching markdown content:', error);
    return '';
  }
};

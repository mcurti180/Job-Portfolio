declare module 'wordsearch-generator' {
    interface WordSearchOptions {
      height?: number;
      width?: number;
      // Add more options as needed based on the package's documentation
    }
  
    function generateGrid(words: string[], options?: WordSearchOptions): string[][];
    
    // Add more functions or interfaces provided by the package if needed
  }
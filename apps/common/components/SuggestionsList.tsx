import { Typewriter } from '@common/components/StreamingText';
import { useEffect, useState } from 'react';

export const SuggestionsList = ({ text }: { text: string }) => {
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatSuggestions = (text: string) => {
    // Parse **Title:** content format
    const bulletPattern = /\*\*([^*]+?):\*\*\s*([^*]+?)(?=\s*\*\*|$)/g;
    const suggestions = [];
    let match: any;

    // biome-ignore lint/suspicious/noAssignInExpressions: <trust me>
    while ((match = bulletPattern.exec(text)) !== null) {
      const title = match[1].trim();
      const content = match[2].trim();
      suggestions.push({ title, content });
    }

    // If no matches found with ** format, try splitting by sentences/periods
    if (suggestions.length === 0) {
      // Split by sentence patterns and look for key sections
      const sentences = text.split(/\.\s+/).filter((s) => s.trim().length > 0);
      const keyWords = [
        'Opening',
        'Body',
        'Closing',
        'Introduction',
        'Conclusion',
      ];

      sentences.forEach((sentence) => {
        const trimmed = sentence.trim();
        if (trimmed) {
          // Look for key words at the start
          const foundKey = keyWords.find((key) =>
            trimmed.toLowerCase().startsWith(key.toLowerCase()),
          );

          if (foundKey) {
            const content = trimmed
              .substring(foundKey.length)
              .replace(/^:\s*/, '')
              .trim();
            suggestions.push({ title: foundKey, content: `${content}.` });
          } else {
            // Treat as a general suggestion
            suggestions.push({ title: 'Suggestion', content: `${trimmed}.` });
          }
        }
      });
    }

    return suggestions;
  };

  const suggestions = formatSuggestions(text);

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-lg text-coverletter">
        Cover Letter Suggestions
      </h3>

      {showTypewriter ? (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border-l-2 border-coverletter/30 pl-4">
              <h4 className="font-medium text-coverletter mb-2">
                <Typewriter
                  fullText={`• ${suggestion.title}`}
                  speedMs={20}
                  startDelayMs={index * 800}
                />
              </h4>
              <div className="text-sm text-muted">
                <Typewriter
                  fullText={suggestion.content}
                  speedMs={15}
                  startDelayMs={
                    index * 800 + suggestion.title.length * 20 + 300
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted animate-pulse">
          Processing suggestions...
        </div>
      )}
    </div>
  );
};

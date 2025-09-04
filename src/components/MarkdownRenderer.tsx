import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const renderMarkdown = async () => {
      if (content) {
        // Configure marked for better rendering
        marked.setOptions({
          breaks: true,
          gfm: true,
        });

        // Render markdown to HTML
        const rawHtml = await marked(content);
        setHtmlContent(rawHtml);
      } else {
        setHtmlContent('');
      }
    };

    renderMarkdown();
  }, [content]);

  if (!htmlContent) {
    return <div className={className}>{content}</div>;
  }

  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

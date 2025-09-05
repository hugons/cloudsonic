import { useEffect, useState } from 'react';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const renderRichText = () => {
      setIsLoading(true);

      if (content) {
        try {
          // Try to parse as Quill delta JSON
          const delta = JSON.parse(content);

          // Create a temporary Quill instance to render the content
          if (typeof window !== 'undefined' && (window as any).Quill) {
            const tempDiv = document.createElement('div');
            const quill = new (window as any).Quill(tempDiv, {
              theme: 'snow',
              readOnly: true,
              modules: { toolbar: false }
            });

            quill.setContents(delta);
            const renderedHtml = tempDiv.querySelector('.ql-editor')?.innerHTML || tempDiv.innerHTML;
            setHtmlContent(renderedHtml);
            setIsLoading(false);
          } else {
            // Fallback: simple text rendering
            setHtmlContent(`<div>${content}</div>`);
            setIsLoading(false);
          }
        } catch (e) {
          // If not JSON, treat as plain HTML or text
          setHtmlContent(`<div>${content}</div>`);
          setIsLoading(false);
        }
      } else {
        setHtmlContent('');
        setIsLoading(false);
      }
    };

    renderRichText();
  }, [content]);

  // Show loading placeholder while processing
  if (isLoading) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!htmlContent) {
    return <div className={className}></div>;
  }

  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

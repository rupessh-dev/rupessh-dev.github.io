import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import {
  FiCopy,
  FiDownload,
  FiRotateCcw,
  FiRotateCw,
  FiMaximize,
  FiMinimize
} from 'react-icons/fi';
import AnimatedBackground from '../../AnimatedBackground';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

// Configure marked with highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

// Templates
const templates = {
  readme: `# Project Title\n\n## Description\nBriefly describe your project here.\n\n## Installation\n\`\`\`bash\nnpm install\n\`\`\`\n\n## Usage\nDescribe how to use your project.\n\n## Features\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Contributing\nExplain how others can contribute.\n\n## License\nMIT`,
  blogPost: `# Blog Post Title\n\n_Published on [Date]_\n\n## Introduction\nStart with a compelling introduction.\n\n## Main Content\nYour main content goes here.\n\n### Subheading\nSupporting details.\n\n## Conclusion\nWrap up your post.\n\n#tags #blog #writing`,
  notes: `# Quick Notes\n\n## Important Points\n- Point 1\n- Point 2\n- Point 3\n\n## Todo\n- [ ] Task 1\n- [ ] Task 2\n- [x] Completed task\n\n## Links\n- [Link 1](url1)\n- [Link 2](url2)`
};

const MarkdownEditor = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('markdownContent');
    if (savedContent) {
      setContent(savedContent);
      setHistory([savedContent]);
      setHistoryIndex(0);
    }
  }, []);

  // Auto-save content to localStorage
  useEffect(() => {
    if (content) {
      localStorage.setItem('markdownContent', content);
    }
  }, [content]);

  // Handle content change with history
  const handleContentChange = (newContent) => {
    setContent(newContent);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo/Redo functions
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(history[historyIndex + 1]);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Download markdown file
  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Load template
  const loadTemplate = (templateName) => {
    handleContentChange(templates[templateName]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            wrapText('**', '**');
            break;
          case 'i':
            e.preventDefault();
            wrapText('_', '_');
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 's':
            e.preventDefault();
            // Auto-save is already implemented
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [content]);

  // Helper function to wrap selected text
  const wrapText = (before, after) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    handleContentChange(newText);
  };

  // Toggle fullscreen
  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(true);
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <AnimatedBackground />
      <div className="relative z-10">
        {!isFullScreen && <Navbar data={{ menu: [] }} showLabsButton={false} showMobileMenu={false} />}
        
        <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-black' : 'px-3 sm:px-4 md:px-6 lg:px-8 pt-20 md:pt-24 pb-12 md:pb-16'}`}>
          <div className="w-full h-full">
            {/* Header - Hide in fullscreen */}
            {!isFullScreen && (
              <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                    Markdown Editor
                  </span>
                </h1>
                <p className="text-gray-300 text-xs md:text-sm mx-auto px-4">
                  Write and preview Markdown with real-time rendering
                </p>
              </div>
            )}

            {/* Toolbar */}
            <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 ${isFullScreen ? 'rounded-none' : 'rounded-t-2xl'} p-4 flex flex-wrap gap-2 items-center justify-between`}>
              {/* Left side buttons */}
              <div className="flex gap-2">
                <button
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="px-3 py-2 rounded-lg flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo (Ctrl+Z)"
                >
                  <FiRotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="px-3 py-2 rounded-lg flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo (Ctrl+Shift+Z)"
                >
                  <FiRotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Right side buttons */}
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 rounded-lg flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700"
                  title="Copy to Clipboard"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="px-3 py-2 rounded-lg flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700"
                  title="Download Markdown"
                >
                  <FiDownload className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFullScreen}
                  className="px-3 py-2 rounded-lg flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700"
                  title="Toggle Fullscreen"
                >
                  {isFullScreen ? (
                    <FiMinimize className="w-4 h-4" />
                  ) : (
                    <FiMaximize className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Templates - Hide in fullscreen */}
            {!isFullScreen && (
              <div className="bg-gray-900/50 backdrop-blur-sm border-x border-gray-800 p-4 flex gap-2 overflow-x-auto">
                <span className="text-gray-400 text-sm">Templates:</span>
                {Object.keys(templates).map((template) => (
                  <button
                    key={template}
                    onClick={() => loadTemplate(template)}
                    className="px-3 py-1 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 whitespace-nowrap"
                  >
                    {template.charAt(0).toUpperCase() + template.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Editor and Preview Container */}
            <div className={`bg-gray-900/30 backdrop-blur-sm border border-gray-800 border-t-0 ${isFullScreen ? 'rounded-none' : 'rounded-b-2xl'} overflow-hidden`}>
              <div className={`flex divide-x divide-gray-800 ${isFullScreen ? 'h-[calc(100vh-3.5rem)]' : 'h-[calc(100vh-20rem)] md:h-[calc(100vh-16rem)] lg:h-[calc(100vh-14rem)] xl:h-[calc(100vh-12rem)]'}`}>
                {/* Editor Panel */}
                <div className="w-1/2 h-full">
                  <textarea
                    className="w-full h-full bg-transparent text-gray-300 p-4 focus:outline-none resize-none font-mono"
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Start writing your markdown here..."
                  />
                </div>

                {/* Preview Panel */}
                <div className="w-1/2 h-full overflow-auto">
                  <div className="bg-white text-gray-900 p-6 min-h-full">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                        h2: (props) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                        h3: (props) => <h3 className="text-xl font-bold mb-3" {...props} />,
                        h4: (props) => <h4 className="text-lg font-bold mb-2" {...props} />,
                        h5: (props) => <h5 className="text-base font-bold mb-2" {...props} />,
                        h6: (props) => <h6 className="text-sm font-bold mb-2" {...props} />,
                        p: (props) => <p className="mb-4" {...props} />,
                        a: (props) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                        ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
                        ol: (props) => <ol className="list-decimal list-inside mb-4" {...props} />,
                        li: (props) => <li className="mb-1" {...props} />,
                        blockquote: (props) => (
                          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                        ),
                        code({inline, className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <div className="relative my-4">
                              <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            </div>
                          ) : (
                            <code className="bg-gray-100 px-2 py-1 rounded" {...props}>
                              {children}
                            </code>
                          );
                        },
                        table: (props) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full border border-gray-300" {...props} />
                          </div>
                        ),
                        th: (props) => (
                          <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold" {...props} />
                        ),
                        td: (props) => (
                          <td className="border border-gray-300 px-4 py-2" {...props} />
                        ),
                        hr: (props) => <hr className="my-8 border-t border-gray-300" {...props} />,
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explore More Tools Button - Hide in fullscreen */}
          {!isFullScreen && (
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/labs')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Explore More Tools
              </button>
            </div>
          )}
        </div>
      </div>
      {!isFullScreen && <Footer />}
    </div>
  );
};

export default MarkdownEditor;

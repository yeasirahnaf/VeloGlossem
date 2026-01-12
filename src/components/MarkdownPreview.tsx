'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, Loader2, Sparkles, Wand2, CheckCircle2 } from 'lucide-react';

interface MarkdownPreviewProps {
    content: string;
    isLoading: boolean;
}

export default function MarkdownPreview({ content, isLoading }: MarkdownPreviewProps) {
    const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = React.useState(true);

    // Smart auto-scroll logic
    React.useEffect(() => {
        if (autoScroll && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [content, autoScroll]);

    // Re-enable auto-scroll when a new generation starts
    React.useEffect(() => {
        if (isLoading) setAutoScroll(true);
    }, [isLoading]);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

        // If user scrolls up significantly, disable auto-scroll
        if (isLoading && !isNearBottom) {
            setAutoScroll(false);
        } else if (isNearBottom) {
            setAutoScroll(true);
        }
    };

    return (
        <div className="portfolio-card flex h-full flex-col overflow-hidden portfolio-card-hover group relative">
            {/* Shimmer overlay when loading */}
            {isLoading && !content && <div className="absolute inset-0 shimmer pointer-events-none z-10" />}

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF9B00] text-white shadow-lg shadow-orange-500/20">
                        <FileText className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            Generated Content
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                            {isLoading ? 'AI working...' : 'Final output'}
                        </p>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50">
                        <Loader2 className="h-3 w-3 animate-spin text-[#FF9B00]" />
                        <span className="text-[10px] font-bold text-[#FF9B00] uppercase">
                            {autoScroll ? 'Auto-Scrolling' : 'Paused Scroll'}
                        </span>
                    </div>
                )}
            </div>

            {/* Preview Area */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-auto bg-white dark:bg-zinc-950 p-8 custom-scrollbar scroll-smooth relative"
            >
                {!content && !isLoading && (
                    <div className="flex min-h-full flex-col items-center justify-center text-center p-8">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9B00] to-[#FFC900] rounded-full opacity-20 blur-2xl animate-pulse" />
                            <div className="relative h-20 w-20 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center">
                                <Wand2 className="h-10 w-10 text-zinc-300 dark:text-zinc-700" />
                            </div>
                        </div>
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Ready to create?</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[200px]">
                            Generate professional documentation with a single click.
                        </p>
                    </div>
                )}

                {isLoading && !content && (
                    <div className="flex h-full flex-col items-center justify-center text-center p-12">
                        <div className="h-16 w-16 mb-6 relative">
                            <div className="absolute inset-0 rounded-2xl bg-[#FF9B00] animate-ping opacity-20" />
                            <div className="relative h-16 w-16 bg-white dark:bg-zinc-900 border-2 border-[#FF9B00] rounded-2xl flex items-center justify-center">
                                <Sparkles className="h-8 w-8 text-[#FF9B00] animate-pulse" />
                            </div>
                        </div>
                        <p className="text-lg font-bold gradient-text-primary animate-pulse">AI is thinking...</p>
                        <p className="mt-2 text-xs text-zinc-400 font-medium uppercase tracking-widest">Formatting Markdown</p>
                    </div>
                )}

                {content && (
                    <div className="prose prose-zinc dark:prose-invert max-w-none break-words overflow-x-hidden
                        prose-headings:tracking-tight prose-headings:mb-4
                        prose-h1:text-4xl prose-h1:font-extrabold prose-h1:border-b-2 prose-h1:border-[#FF9B00]/20 prose-h1:pb-6
                        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                        prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
                        prose-a:text-[#FF9B00] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        prose-code:text-[#FF9B00] prose-code:bg-orange-50 dark:prose-code:bg-orange-950/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.9em]
                        prose-pre:bg-zinc-900 prose-pre:border-none prose-pre:shadow-2xl prose-pre:overflow-x-auto
                        prose-blockquote:border-l-4 prose-blockquote:border-[#FF9B00] prose-blockquote:italic
                        prose-li:my-1
                        selection:bg-[#FF9B00] selection:text-white pb-12">
                        <ReactMarkdown>{content}</ReactMarkdown>
                        {/* Auto-scroll anchor */}
                        {isLoading && <div className="h-px w-full" />}
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            {content && (
                <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 opacity-60">
                            <Sparkles className="h-3 w-3 text-[#FF9B00]" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase">{wordCount} Words</span>
                        </div>
                        <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-800" />
                        <div className="flex items-center gap-1.5 opacity-60">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase">Success</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism-tomorrow.css';
import { Terminal, Maximize2 } from 'lucide-react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
    return (
        <div className="portfolio-card flex h-full flex-col overflow-hidden portfolio-card-hover group">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        <Terminal className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            Drafting Area
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                            Define your scope
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                        {value.length.toLocaleString()} <span className="text-[10px] opacity-70">chars</span>
                    </div>
                    <button className="text-zinc-400 hover:text-[#FF9B00] transition-colors p-1 opacity-0 group-hover:opacity-100 hidden sm:block">
                        <Maximize2 className="h-3 w-3" />
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="relative flex-1 overflow-auto bg-white dark:bg-zinc-950 p-6">
                <Editor
                    value={value}
                    onValueChange={onChange}
                    highlight={(code) => highlight(code, languages.markdown, 'markdown')}
                    padding={0}
                    placeholder="Enter details about your feature, project, or component...

Example:
• Project Name: VeloGlossem
• Main Features: AI Streaming, Template selection, Multi-model support
• Installation: npm install
• Tone: Professional & Technical"
                    style={{
                        fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        fontSize: '14px',
                        lineHeight: '1.8',
                        minHeight: '100%',
                    }}
                    className="min-h-full text-zinc-900 dark:text-zinc-100 outline-none"
                />
            </div>

            {/* Footer / Status */}
            <div className="px-5 py-2.5 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    ))}
                </div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Input Terminal</span>
            </div>
        </div>
    );
}

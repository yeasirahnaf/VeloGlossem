'use client';

import React, { useState } from 'react';
import { Sparkles, RotateCcw, FileDown, Copy, Check, Zap, Github, Terminal, BookOpen, Layout, Cpu } from 'lucide-react';
import { toast } from 'sonner';
import CodeEditor from './CodeEditor';
import MarkdownPreview from './MarkdownPreview';
import { documentationTemplates } from '@/lib/prompts';

const geminiModels = [
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', icon: '⚡' },
    { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', icon: '🚀' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', icon: '💨' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', icon: '💎' },
];

export default function Workspace() {
    const [input, setInput] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(documentationTemplates[0]);
    const [selectedModel, setSelectedModel] = useState(geminiModels[0]);
    const [copied, setCopied] = useState(false);
    const [completion, setCompletion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!input.trim()) {
            toast.error('Please enter some input first');
            return;
        }

        setIsLoading(true);
        setCompletion('');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    systemPrompt: selectedTemplate.systemPrompt,
                    model: selectedModel.id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error('No response body');

            let accumulatedText = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                accumulatedText += chunk;
                setCompletion(accumulatedText);
            }

            toast.success('Documentation generated!');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Generation failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setInput('');
        setCompletion('');
        toast.success('Cleared!');
    };

    const handleCopy = async () => {
        if (!completion) return;
        try {
            await navigator.clipboard.writeText(completion);
            setCopied(true);
            toast.success('Copied!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    };

    const handleDownload = () => {
        if (!completion) return;
        const blob = new Blob([completion], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTemplate.id}-${Date.now()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Downloaded!');
    };

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-[#FF9B00]/30">
            {/* Background Pattern */}
            <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

            {/* Header / Navbar */}
            <nav className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF9B00] to-[#FFC900] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                            <Zap className="h-5 w-5 text-white fill-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Velo<span className="gradient-text-primary">Gossem</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm font-medium text-zinc-600 hover:text-[#FF9B00] dark:text-zinc-400 dark:hover:text-[#FFC900] transition-colors">Documentation</a>
                        <a href="https://github.com/yeasirahnaf/VeloGlossem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:bg-[#FF9B00]/10 hover:border-[#FF9B00] transition-all">
                            <Github className="h-4 w-4" />
                            Star on GitHub
                        </a>
                    </div>
                </div>
            </nav>

            <main className="relative flex-1 container mx-auto px-6 py-12">
                {/* Hero Section */}
                <section className="mb-16 grid lg:grid-cols-2 gap-12 items-center animate-fadeInUp">
                    <div>
                        <h2 className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
                            Document your <br />
                            <span className="gradient-text-primary">Next Big Thing</span>
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg leading-relaxed">
                            VeloGossem helps developers generate professional documentation in seconds.
                            Select a template, describe your project, and let AI do the heavy lifting.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            {[
                                { icon: Terminal, label: 'README', color: 'text-orange-500' },
                                { icon: BookOpen, label: 'API Ref', color: 'text-yellow-500' },
                                { icon: Layout, label: 'Changelog', color: 'text-amber-500' },
                                { icon: Cpu, label: 'Technical', color: 'text-orange-600' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <item.icon className={`h-4 w-4 ${item.color}`} />
                                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="w-64 h-64 bg-gradient-to-br from-[#FF9B00] to-[#FFC900] rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] animate-float pulse-glow relative overflow-hidden flex items-center justify-center">
                            <Sparkles className="h-24 w-24 text-white opacity-40 absolute -top-4 -right-4" />
                            <Layout className="h-32 w-32 text-white animate-pulse" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 rotate-3 bounce">
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="h-2 w-2 rounded-full bg-[#FF9B00]/40" />)}
                            </div>
                            <div className="mt-2 h-2 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                            <div className="mt-2 h-2 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        </div>
                    </div>
                </section>

                {/* Controls Bar */}
                <div className="sticky top-20 z-40 mb-20 p-3 portfolio-card flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl bg-white/95 dark:bg-zinc-900/95 shadow-2xl border-x-0 sm:border-x rounded-none sm:rounded-2xl border-t-0 sm:border-t transition-all">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Template</span>
                            <select
                                value={selectedTemplate.id}
                                onChange={(e) => {
                                    const template = documentationTemplates.find(t => t.id === e.target.value);
                                    if (template) setSelectedTemplate(template);
                                }}
                                className="bg-transparent text-sm font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer hover:text-[#FF9B00] transition-colors"
                            >
                                {documentationTemplates.map((t) => (
                                    <option key={t.id} value={t.id} className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">📄 {t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />

                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Engine</span>
                            <select
                                value={selectedModel.id}
                                onChange={(e) => {
                                    const model = geminiModels.find(m => m.id === e.target.value);
                                    if (model) setSelectedModel(model);
                                }}
                                className="bg-transparent text-sm font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer hover:text-[#FF9B00] transition-colors"
                            >
                                {geminiModels.map((m) => (
                                    <option key={m.id} value={m.id} className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">{m.icon} {m.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                            <button
                                onClick={handleClear}
                                disabled={isLoading}
                                className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-700 text-zinc-500 hover:text-red-500 transition-all disabled:opacity-50"
                                title="Clear Workspace"
                            >
                                <RotateCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                                onClick={handleCopy}
                                disabled={!completion || isLoading}
                                className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-700 text-zinc-500 hover:text-[#FF9B00] transition-all disabled:opacity-50"
                                title="Copy Content"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </button>
                            <button
                                onClick={handleDownload}
                                disabled={!completion || isLoading}
                                className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-700 text-zinc-500 hover:text-[#FF9B00] transition-all disabled:opacity-50"
                                title="Download .md"
                            >
                                <FileDown className="h-4 w-4" />
                            </button>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !input.trim()}
                            className="shine-effect flex items-center gap-2 h-10 px-6 rounded-lg bg-gradient-to-r from-[#FF9B00] to-[#FFC900] text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner transition-all disabled:opacity-50 disabled:translate-y-0"
                        >
                            <Sparkles className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            {isLoading ? 'Drafting...' : 'Generate Docs'}
                        </button>
                    </div>
                </div>

                {/* Active Workspace */}
                <div className="grid h-[600px] lg:h-[750px] grid-cols-1 gap-12 lg:grid-cols-2 min-h-0 relative scroll-mt-32">
                    <div className="flex flex-col min-h-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <CodeEditor value={input} onChange={setInput} />
                    </div>
                    <div className="flex flex-col min-h-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <MarkdownPreview content={completion} isLoading={isLoading} />
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-gradient-to-br from-[#FF9B00] to-[#FFC900]" />
                        <span className="font-bold text-zinc-900 dark:text-zinc-50">VeloGlossem</span>
                    </div>
                    <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
                        "Documentation is a love letter that you write to your future self." — Damian Conway
                    </p>
                    <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <a href="#" className="hover:text-[#FF9B00] transition-colors">Privacy</a>
                        <a href="#" className="hover:text-[#FF9B00] transition-colors">Terms</a>
                        <a href="#" className="hover:text-[#FF9B00] transition-colors">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

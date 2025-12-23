import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RiFileCopy2Line, RiCheckLine } from "react-icons/ri";
import { useState } from "react";

const Result = ({ explanation }) => {
    const [copied, setCopied] = useState(false);

    function handleCopy(exp) {
        navigator.clipboard.writeText(exp);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 lg:p-6 shadow-2xl overflow-hidden lg:h-full flex flex-col">
            {/* Header with Copy Button */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10 shrink-0">
                <h2 className="text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Explanation
                </h2>

                <button
                    onClick={() => handleCopy(explanation)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-sm font-medium text-gray-300 hover:text-white"
                    title="Copy explanation"
                >
                    {copied ? (
                        <>
                            <RiCheckLine className="text-lg text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <RiFileCopy2Line className="text-lg" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Markdown Content with Custom Styling */}
            <div className="prose prose-invert prose-purple max-w-none flex-1 lg:overflow-y-auto custom-scrollbar">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Style headings
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-purple-300 mt-6 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-purple-300 mt-5 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-purple-300 mt-4 mb-2" {...props} />,

                        // Style paragraphs
                        p: ({ node, ...props }) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,

                        // Style lists
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300" {...props} />,
                        li: ({ node, ...props }) => <li className="ml-4" {...props} />,

                        // Style code blocks
                        code: ({ node, inline, ...props }) =>
                            inline ? (
                                <code className="bg-purple-900/30 text-pink-300 px-2 py-1 rounded text-sm font-mono border border-purple-500/30" {...props} />
                            ) : (
                                <code className="block bg-slate-900/70 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-white/10 my-3" {...props} />
                            ),

                        // Style pre blocks
                        pre: ({ node, ...props }) => <pre className="bg-slate-900/70 rounded-lg overflow-x-auto border border-white/10 my-3" {...props} />,

                        // Style links
                        a: ({ node, ...props }) => <a className="text-purple-400 hover:text-purple-300 underline transition-colors" {...props} />,

                        // Style blockquotes
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-4" {...props} />,

                        // Style tables
                        table: ({ node, ...props }) => <table className="min-w-full border-collapse border border-white/10 my-4" {...props} />,
                        th: ({ node, ...props }) => <th className="border border-white/10 px-4 py-2 bg-white/5 text-purple-300 font-semibold" {...props} />,
                        td: ({ node, ...props }) => <td className="border border-white/10 px-4 py-2 text-gray-300" {...props} />,

                        // Style strong/bold - use white for better readability
                        strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,

                        // Style emphasis/italic
                        em: ({ node, ...props }) => <em className="text-pink-300 italic" {...props} />,
                    }}
                >
                    {explanation}
                </Markdown>
            </div>
        </div>
    );
};

export default Result;
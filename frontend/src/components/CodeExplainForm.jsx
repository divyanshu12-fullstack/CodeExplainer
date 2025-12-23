import { useActionState } from "react";
import { explainCode } from "../actions/index.js";
import { useState } from "react";
import Result from "./Result.jsx";
import Error from "./Error.jsx";

const CodeExplainForm = () => {
    const [formState, formAction, isPending] = useActionState(explainCode, null);
    const [code, setCode] = useState("");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-full lg:min-h-0">
            {/* Left Panel - Input */}
            <div className="flex flex-col lg:h-full lg:min-h-0">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 lg:p-6 shadow-2xl lg:h-full flex flex-col">
                    <form action={formAction} className="space-y-4 lg:h-full flex flex-col">
                        <div>
                            <label className='block mb-2 font-semibold text-purple-300 text-sm uppercase tracking-wide'>
                                Select Language
                            </label>
                            <div className="relative">
                                <select
                                    name="language"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-12 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium cursor-pointer hover:bg-white/10"
                                >
                                    <option className="bg-slate-900 text-gray-300" value="JSX">JSX</option>
                                    <option className="bg-slate-900 text-gray-300" value="JavaScript">JavaScript</option>

                                    <option className="bg-slate-900 text-gray-300" value="TypeScript">TypeScript</option>
                                    <option className="bg-slate-900 text-gray-300" value="Python">Python</option>
                                    <option className="bg-slate-900 text-gray-300" value="Java">Java</option>
                                    <option className="bg-slate-900 text-gray-300" value="C++">C++</option>
                                    <option className="bg-slate-900 text-gray-300" value="Go">Go</option>
                                    <option className="bg-slate-900 text-gray-300" value="Rust">Rust</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <label className="block mb-2 font-semibold text-purple-300 text-sm uppercase tracking-wide">
                                Your Code
                            </label>
                            <textarea
                                name="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="flex-1 w-full min-h-[200px] lg:min-h-0 bg-slate-950/50 border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none placeholder-gray-600 leading-relaxed custom-scrollbar"
                                required
                                spellCheck="false"
                                placeholder="// Paste your code here...&#10;function example() {&#10;  console.log('Hello World');&#10;}"
                            />
                        </div>

                        <button
                            disabled={isPending}
                            type="submit"
                            className="group w-full relative overflow-hidden bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-[200%_auto] hover:bg-right text-white font-bold px-6 py-4 rounded-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] shrink-0"
                        >
                            {isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing Code...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Explain Code
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Panel - Output */}
            <div className="flex flex-col lg:h-full lg:min-h-0">
                {isPending ? (
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-purple-300 text-lg font-medium">Analyzing your code...</p>
                        </div>
                    </div>
                ) : formState?.success ? (
                    <Result explanation={formState.explanation} />
                ) : formState?.success === false ? (
                    <Error error={formState.error} />
                ) : (
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-center">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="w-16 h-16 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                                <span className="text-4xl">💡</span>
                            </div>
                            <p className="text-gray-400 text-lg">
                                Paste your code and click "Explain Code"
                            </p>
                            <p className="text-gray-500 text-sm">
                                Get instant AI-powered explanations
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeExplainForm;
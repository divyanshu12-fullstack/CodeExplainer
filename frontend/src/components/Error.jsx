import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Error = ({ error }) => {
    return (
        <div className="bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-400 mb-3">Error</h3>
                    <div className="text-gray-300 leading-relaxed">
                        <Markdown remarkPlugins={[remarkGfm]}>{error}</Markdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
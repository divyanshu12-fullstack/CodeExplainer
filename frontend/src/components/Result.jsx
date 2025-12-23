import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RiFileCopy2Line } from "react-icons/ri";
import { useState } from "react";

const Result = ({ explanation }) => {

    const [copied, setCopied] = useState(false);

    function handleCopy(exp) {
        navigator.clipboard.writeText(exp);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="relative w-full max-w-4xl mt-6 bg-gray-300 p-6 rounded-2xl shadow-2xl">
            {/* Copy Icon */}
            <RiFileCopy2Line
                className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-700 hover:text-black transition"
                onClick={() => handleCopy(explanation)}
                title="Copy explanation"
            /> {copied && (
                <span className="absolute top-4 right-12 text-sm font-bold">
                    Copied!
                </span>
            )}

            <h2 className="text-xl font-semibold mb-2">
                Explanation:
            </h2>

            <Markdown remarkPlugins={[remarkGfm]}>
                {explanation}
            </Markdown>
        </div>
    );
};

export default Result;

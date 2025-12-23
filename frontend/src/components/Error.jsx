import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Error = ({ error }) => {
    return (
        <div>
            <Markdown remarkPlugins={[remarkGfm]}>{error}</Markdown>
        </div>
    );
};

export default Error;
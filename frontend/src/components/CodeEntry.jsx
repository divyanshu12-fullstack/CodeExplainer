import Header from "./Header";
import CodeExplainForm from "./CodeExplainForm";

const CodeEntry = () => {
    return (
        <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#0f0a1f] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6 lg:py-8 max-w-7xl lg:min-h-0">
                <CodeExplainForm />
            </main>
        </div>
    );
};

export default CodeEntry;
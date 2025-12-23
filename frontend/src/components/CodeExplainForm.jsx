import { useActionState } from "react";
import { explainCode } from "../actions/index.js";
import { useState } from "react";
import Result from "./Result.jsx";
import Error from "./Error.jsx";

const CodeExplainForm = () => {
    const [formState, formAction, isPending] = useActionState(explainCode, null);
    const [code, setCode] = useState("");
    return (
        <>
            <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-2xl">
                <form action={formAction}>
                    <label className='block mb-2 font-semibold'>Languages: </label>
                    <select name="language" className='border rounded-lg p-2 w-full mb-4 rounded-l bg-transparent'>
                        <option>Jsx</option>
                        <option>JavaScript</option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>C++</option>
                    </select>
                    <label className="block mb-2 font-semibold">Your Code:</label>
                    <textarea name="code" value={code} onChange={(e) => setCode(e.target.value)} className="border rounded-lg p-2 w-full mb-4 font-mono bg-transparent min-h-50" required placeholder="Paste your code here..." />
                    <button
                        disabled={isPending}
                        type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-200">
                        {isPending ? "Explaining..." : "Explain Code"}
                    </button>
                </form>
                {isPending ? (
                    <p className="bg-gray-300 my-3 w-64 p-2">Thinking...</p>
                ) : formState?.success ? (
                    <Result explanation={formState.explanation} />
                ) : formState?.success === false && (
                    <Error error={formState.error}></Error>
                )}
            </div >
        </>
    );
};

export default CodeExplainForm;
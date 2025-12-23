// This function mocks a server action or calls an API
// It runs in the browser in this Vite setup

export async function explainCode(prevState, formData) {
    // 👆 This is a SERVER ACTION
    // prevState → previous result returned by this function (from useActionState)
    // formData  → all values submitted from the <form>

    // Extract values from the form using the "name" attribute
    const language = formData.get("language");
    // Example: "JavaScript", "Python", etc.

    const code = formData.get("code");
    // Example: user's pasted source code

    try {
        // Send a POST request to the backend API
        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/explain-code`,
            {
                method: "POST", // We are sending data to the server
                headers: {
                    "Content-type": "application/json"
                    // Tell the server: "I am sending JSON data"
                },
                body: JSON.stringify({
                    language: language, // programming language
                    code: code           // actual code to explain
                })
            }
        );

        // If the server responded with an error (status not 200–299)
        if (!res.ok) {
            // Return an error object
            // This becomes the new "state" in useActionState
            return {
                success: false,
                error: "Failed to fetch explanation from server."
            };
        }

        // Convert server response from JSON → JavaScript object
        const data = await res.json();
        // Example response:
        // { explanation: "This function prints Hello World" }

        // Return success result
        // React will store this in state automatically
        return {
            success: true,
            explanation: data.explanation
        };

    } catch (error) {
        // This runs if:
        // - network fails
        // - server is down
        // - JSON parsing fails
        // - fetch throws an error

        return {
            success: false,
            error: "Something went wrong while explaining the code: " + error.message
        };
    }
}

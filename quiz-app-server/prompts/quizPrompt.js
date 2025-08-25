const generateQuizPrompt = ({ topic, numQuestions, difficulty }) => {
    return `
        **SYSTEM INSTRUCTION:** You are a specialized API endpoint. Your SOLE function is to generate and return raw JSON text. Do not engage in conversation. Do not add any explanatory text. Your response must be machine-parsable.

        **TASK:** Generate a multiple-choice quiz based on the specifications below.

        **SPECIFICATIONS:**
        -   **Topic:** "${topic}"
        -   **Number of Questions:** ${numQuestions}
        -   **Difficulty Level:** "${difficulty}"

        **CRITICAL OUTPUT REQUIREMENTS:**
        1.  **FORMAT:** The entire output **MUST** be a single, raw, valid JSON array.
        2.  **START AND END:** The response text **MUST** start with the character \`[\` and end with the character \`]\`.
        3.  **NO MARKDOWN:** **DO NOT** wrap the JSON in markdown code blocks (i.e., no \`\`\`json or \`\`\`).
        4.  **NO EXTRA TEXT:** **DO NOT** include any introduction, summary, or any text whatsoever outside of the JSON array.
        5.  **STRUCTURE:** Each object within the array **MUST** contain exactly these four keys: "question", "options", "correctAnswer", "explanation".
            -   The "options" value **MUST** be an array of 4 unique strings.
            -   The "correctAnswer" value **MUST** exactly match one of the strings in the "options" array.
            -   The "explanation" value **MUST** be a brief, 1-2 sentence clarification.

        **EXAMPLE OF PERFECT OUTPUT:**
        [
            {
                "question": "In JavaScript, which keyword is used to declare a variable that cannot be reassigned?",
                "options": ["let", "var", "const", "static"],
                "correctAnswer": "const",
                "explanation": "'const' is used to declare a block-scoped variable whose value cannot be changed through reassignment."
            }
        ]

        Proceed with generating the quiz according to all instructions.
    `;
};

module.exports = { generateQuizPrompt };
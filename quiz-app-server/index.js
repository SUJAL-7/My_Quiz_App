const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Import the prompt functions
const { generateQuizPrompt } = require('./prompts/quizPrompt');
const { generateAnalysisPrompt } = require('./prompts/analysisPrompt');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const isProd = process.env.NODE_ENV === 'production';
app.use(cors());
app.use(express.json());

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// A simple utility function to find and extract a JSON string from text
const extractJson = (text) => {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
        return jsonMatch[1];
    }
    // Fallback for cases where there are no backticks
    const fallbackMatch = text.match(/\[[\s\S]*\]|{[\s\S]*}/);
    if (fallbackMatch) {
        return fallbackMatch[0];
    }
    // If no JSON is found, return the original text to let JSON.parse handle the error
    return text;
};

// --- API Endpoints ---

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint 1: Generate Quiz (Updated with the cleaner)
app.post('/generate-quiz', async (req, res) => {
    try {
        const { topic, numQuestions, difficulty } = req.body;
        const prompt = generateQuizPrompt({ topic, numQuestions, difficulty });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();
        
        // Use our new utility function to clean the text before parsing
        const cleanedText = extractJson(rawText);
        const jsonResponse = JSON.parse(cleanedText);
        
        res.json(jsonResponse);

    } catch (error) {
        console.error("Error generating quiz:", error);
        // Include the raw text in the error for easier debugging
        console.error("Raw AI Response:", rawText);
        res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }
});

// Endpoint 2: Analyze Results (Updated with the cleaner)
app.post('/analyze-results', async (req, res) => {
    try {
        const { topic, quizData } = req.body; 
        const prompt = generateAnalysisPrompt({ topic, quizData });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        // Use our new utility function here as well
        const cleanedText = extractJson(rawText);
        const jsonResponse = JSON.parse(cleanedText);

        res.json(jsonResponse);

    } catch (error) {
        console.error("Error analyzing results:", error);
        console.error("Raw AI Response:", rawText);
        res.status(500).json({ error: "Failed to analyze results." });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
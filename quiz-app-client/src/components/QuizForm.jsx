import React from 'react';

const QuizForm = ({ topic, setTopic, numQuestions, setNumQuestions, difficulty, setDifficulty, handleGenerateQuiz, loading }) => {
  
  const inputStyle = "mt-2 p-3 w-full bg-slate-700 rounded-lg border-2 border-slate-600 focus:outline-none focus:border-cyan-400 transition-all duration-300 shadow-lg";
  const labelStyle = "text-lg font-semibold text-slate-200";

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-800 rounded-2xl shadow-2xl border-t-4 border-cyan-400">
      <h1 className="text-4xl font-bold text-white text-center mb-2">AI Quiz Master</h1>
      <p className="text-slate-400 text-center mb-8">Craft your perfect challenge!</p>
      
      <form onSubmit={handleGenerateQuiz}>
        {/* Topic Input */}
        <div className="mb-6 transform transition-transform duration-300 hover:scale-105">
          <label htmlFor="topic" className={labelStyle}>What's the Topic?</label>
          <input 
            type="text" 
            id="topic"
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
            className={inputStyle}
            placeholder="e.g., Ancient Rome, JavaScript, etc."
            required 
          />
        </div>

        {/* Number of Questions Input */}
        <div className="mb-6 transform transition-transform duration-300 hover:scale-105">
          <label htmlFor="numQuestions" className={labelStyle}>How Many Questions?</label>
          <input 
            type="number" 
            id="numQuestions"
            value={numQuestions} 
            onChange={(e) => setNumQuestions(e.target.value)} 
            className={inputStyle}
            min="3" max="15" 
            required 
          />
        </div>

        {/* Difficulty Select */}
        <div className="mb-8 transform transition-transform duration-300 hover:scale-105">
          <label htmlFor="difficulty" className={labelStyle}>Select Difficulty</label>
          <select 
            id="difficulty"
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className={`${inputStyle} appearance-none`}
          >
            <option value="Easy">Easy Peasy</option>
            <option value="Medium">Medium Rare</option>
            <option value="Hard">Challenge Mode</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 px-6 bg-cyan-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all duration-300 transform hover:-translate-y-1 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {loading ? 'Conjuring Questions...' : '🚀 Start the Challenge!'}
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const QuestionDisplay = ({ quiz, currentQuestionIndex, handleAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const currentQuestion = quiz[currentQuestionIndex];

  // Reset state when the question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const onOptionClick = (option) => {
    if (isAnswered) return; // Prevent changing answer

    setIsAnswered(true);
    setSelectedOption(option);
    
    // Wait 1 second to show feedback before moving on
    setTimeout(() => {
      handleAnswerSubmit(option);
    }, 1000);
  };

  const getButtonClass = (option) => {
    if (!isAnswered) {
      return "bg-slate-700 hover:bg-cyan-600"; // Default state
    }

    const isCorrect = option === currentQuestion.correctAnswer;
    const isSelected = option === selectedOption;

    if (isCorrect) {
      return "bg-green-500 animate-pulse"; // Correct answer
    }
    if (isSelected && !isCorrect) {
      return "bg-red-500"; // Selected incorrect answer
    }
    return "bg-slate-700 opacity-50"; // Other incorrect options
  };

  return (
    <div className="max-w-3xl w-full p-8 bg-slate-800 rounded-2xl shadow-2xl">
      <ProgressBar current={currentQuestionIndex + 1} total={quiz.length} />
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        {currentQuestion.question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionClick(option)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
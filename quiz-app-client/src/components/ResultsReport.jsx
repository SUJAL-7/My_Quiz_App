import React from 'react';
import Confetti from 'react-confetti';

const ResultsReport = ({ score, totalQuestions, analysis, userAnswers, onPlayAgain }) => {
  const scorePercentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (scorePercentage >= 75) return "text-green-400";
    if (scorePercentage >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const handleDownload = () => {
    let fileContent = `QUIZ REVIEW\n`;
    fileContent += `Topic: ${userAnswers[0].topic || 'General'}\n`;
    fileContent += `Final Score: ${scorePercentage}% (${score}/${totalQuestions})\n`;
    fileContent += "========================================\n\n";
    
    fileContent += "--- AI ANALYSIS ---\n";
    fileContent += `Strengths: ${analysis.strengths}\n`;
    fileContent += `Weaknesses: ${analysis.weaknesses}\n`;
    fileContent += `Study More: ${analysis.studyMore}\n`;
    fileContent += `Path Forward: ${analysis.pathForward}\n\n`;
    
    fileContent += "--- QUESTION REVIEW ---\n";
    userAnswers.forEach((item, index) => {
      fileContent += `Q${index + 1}: ${item.question}\n`;
      fileContent += `   - Your Answer: ${item.userAnswer} ${item.userAnswer === item.correctAnswer ? "(Correct)" : "(Incorrect)"}\n`;
      fileContent += `   - Correct Answer: ${item.correctAnswer}\n`;
      fileContent += `   - Explanation: ${item.explanation}\n\n`;
    });

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quiz-review.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {scorePercentage >= 75 && <Confetti />}
      <div className="max-w-3xl w-full p-8 bg-slate-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Quiz Complete!</h2>
          <div className="my-6">
            <p className="text-slate-300 text-xl">Your Score</p>
            <p className={`text-7xl font-bold ${getScoreColor()}`}>{scorePercentage}%</p>
            <p className="text-slate-400 text-lg">({score} out of {totalQuestions} correct)</p>
          </div>
        </div>

        {/* --- AI Analysis Report --- */}
        <div className="text-left bg-slate-900 p-6 rounded-lg mb-6">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">🤖 AI Analysis Report</h3>
            <div className="mb-4">
                <h4 className="font-bold text-lg text-green-400">✅ Strengths</h4>
                <p className="text-slate-300">{analysis.strengths}</p>
            </div>
            <div className="mb-4">
                <h4 className="font-bold text-lg text-yellow-400">🧠 Weaknesses</h4>
                <p className="text-slate-300">{analysis.weaknesses}</p>
            </div>
            <div className="mb-4">
                <h4 className="font-bold text-lg text-cyan-400">📚 What to Study Next</h4>
                <p className="text-slate-300 whitespace-pre-line">{analysis.studyMore}</p>
            </div>
            <div>
                <h4 className="font-bold text-lg text-purple-400">🚀 Path Forward</h4>
                <p className="text-slate-300">{analysis.pathForward}</p>
            </div>
        </div>

        {/* --- Question & Answer Review --- */}
        <div className="text-left bg-slate-900 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">🧐 Review Your Answers</h3>
            {userAnswers.map((item, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-slate-700 last:border-b-0 last:pb-0">
                    <p className="font-bold text-white">Q{index + 1}: {item.question}</p>
                    <p className={`pl-4 ${item.userAnswer === item.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                        Your Answer: {item.userAnswer}
                    </p>
                    <p className="pl-4 text-slate-300">Correct Answer: {item.correctAnswer}</p>
                </div>
            ))}
        </div>

        {/* --- Action Buttons --- */}
        <div className="mt-8 space-y-4">
            <button
                onClick={handleDownload}
                className="w-full py-3 px-6 bg-purple-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1"
            >
                ⬇️ Download Full Review
            </button>
            <button
              onClick={onPlayAgain}
              className="w-full py-3 px-6 bg-cyan-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              Play Again!
            </button>
        </div>
      </div>
    </>
  );
};

export default ResultsReport;
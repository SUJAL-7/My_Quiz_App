import { useState } from 'react';
import axios from 'axios';

// Import all our components
import QuizForm from './components/QuizForm';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsReport from './components/ResultsReport';
import Loader from './components/Loader';

const API_URL = 'http://localhost:5000';

function App() {
  // Form configuration
  const [topic, setTopic] = useState('JavaScript');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');

  // Quiz state
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  // App state
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [gameState, setGameState] = useState('CONFIG'); // 'CONFIG', 'PLAYING', 'LOADING_ANALYSIS', 'RESULTS'

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/generate-quiz`, { topic, numQuestions, difficulty });
      setQuiz(response.data);
      setGameState('PLAYING');
    } catch (err) {
      setError('Failed to generate the quiz. The AI might be busy!');
      setGameState('CONFIG'); // Go back to config on error
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = (selectedOption) => {
    const isCorrect = selectedOption === quiz[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const answeredQuestion = { ...quiz[currentQuestionIndex], userAnswer: selectedOption };
    const updatedAnswers = [...userAnswers, answeredQuestion];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      getAnalysis(updatedAnswers);
    }
  };

  const getAnalysis = async (finalAnswers) => {
    setGameState('LOADING_ANALYSIS');
    try {
      const payload = {
        topic: topic,
        quizData: finalAnswers.map(q => ({
          question: q.question,
          userAnswer: q.userAnswer,
          correctAnswer: q.correctAnswer
        }))
      };
      const response = await axios.post(`${API_URL}/analyze-results`, payload);
      setAnalysis(response.data);
      setGameState('RESULTS');
    } catch (err) {
      setError('Failed to get analysis.');
      console.error(err);
    }
  };

  const handlePlayAgain = () => {
    // Reset all state to initial values
    setQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setAnalysis(null);
    setError('');
    setGameState('CONFIG');
  };

  const renderGameState = () => {
    if (error) {
      return (
        <div className="text-center">
            <p className="text-red-400 text-xl mb-4">{error}</p>
            <button onClick={handlePlayAgain} className="py-2 px-4 bg-cyan-600 rounded-lg">Try Again</button>
        </div>
      );
    }

    switch (gameState) {
      case 'CONFIG':
        return <QuizForm {...{ topic, setTopic, numQuestions, setNumQuestions, difficulty, setDifficulty, handleGenerateQuiz, loading }} />;
      case 'PLAYING':
        return <QuestionDisplay {...{ quiz, currentQuestionIndex, handleAnswerSubmit }} />;
      case 'LOADING_ANALYSIS':
        return <Loader text="Analyzing your performance..." />;
      case 'RESULTS':
        return <ResultsReport {...{ score, totalQuestions: quiz.length, analysis, onPlayAgain: handlePlayAgain, userAnswers }} />;
      default:
        return <Loader />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
      {renderGameState()}
    </div>
  );
}

export default App;
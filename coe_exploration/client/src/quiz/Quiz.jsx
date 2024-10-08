import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import ResultsComponent from './ResultsComponent';
import Background from '../assets/quizbg.png'

const Quiz = () => {
  const [currentPage, setCurrentPage] = useState('question');
  const [userAnswers, setUserAnswers] = useState([]);

  const handleNext = (selectedOption, isFinalQuestion) => {
    setUserAnswers(prevAnswers => [...prevAnswers, ...selectedOption]);

    // If it's the final question, display results
    if (isFinalQuestion) {
      setCurrentPage('results');
    }
  };

  return (
    <>
      <div style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover', height: '100vh', width: '100vw'}}> 
        <div>
          {currentPage === 'question' && (
            <QuestionComponent onNext={handleNext} />
          )}
          {currentPage === 'results' && (
            <ResultsComponent userAnswers={userAnswers} />
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;


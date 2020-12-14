import React, {useEffect, useState} from 'react';
import { getQuizDetails } from './Services/quizServices';
import {QuestionTypes} from './Types/quizTypes';
import './App.css';
import QuestionCard from './Components/QuestionCards';

function App() {
  let [quiz, setQuiz] = useState<QuestionTypes[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }


  useEffect(() => {
    async function fetchData(){
      const questions:QuestionTypes[] = await getQuizDetails(5,"medium");
//      console.log(questions)
      setQuiz(questions)
    }
    fetchData();
  }, [])
    const handleSubmitt = (e:React.FormEvent<EventTarget>, userAnswer: String) => {
      e.preventDefault();
      console.log(userAnswer);

      


      const currentQuestion:QuestionTypes = quiz[currentStep];
      console.log("Correct Answer: "+ currentQuestion.correct_answer + "-- User Selection: "+ userAnswer )
      
      if (userAnswer === currentQuestion.correct_answer){
        setScore(++score)
      }
      console.log(score)
      if(currentStep !== quiz.length-1) 
      setCurrentStep(++currentStep);
      else { 
      setShowResult(true);
      // setCurrentStep(0);
      // setScore(0);
    }
    }

  if(!quiz.length)
    return <h3>Loading...</h3>
  
    if(showResult){
      return(<div className="question-text">
        <div><h2>Result</h2></div>
        <div><p className="result-text"> Quiz Completed - Your Final Score is : {score} out of {quiz.length}</p></div>
      <button className="button" onClick={refreshPage}>Click to reload!</button>
      </div>)
    }


  return (
    //<div className='question-text'>
      //<QuestionCard questions={quiz[currentStep].question}/>
    //</div>
    
    <div className="question-text">
      <h1>Quiz App for General Knowledge</h1>
      <QuestionCard
      options={quiz[currentStep].option}
      questions={quiz[currentStep].question}
      callback={handleSubmitt}
      />
    </div>
  );
}

export default App;

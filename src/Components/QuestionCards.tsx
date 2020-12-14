import React, { useState } from 'react';
import {questionPropsType} from '../Types/quizTypes'

const QuestionCard:React.FC<questionPropsType> = ({questions,options,callback}) => {
    let [selectedAnswer, setSelectedAnswer] = useState("");
    const handleSelection = (ev: any) => {
        //console.log(ev.target.value)
        setSelectedAnswer(ev.target.value);
    }
        return(
        
        <div className="question-container">
            <div className="question">

        </div>
            <div>
            <h3>{questions}</h3>
            </div>

            <form onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e, selectedAnswer)}
            className="question-form">
                {
                    options.map((opt:string, ind:number) => {
                        
                        return (
                            <div className = "answer-section" key={ind}>
                            <label className="label">
                                <input 
                                    type="radio" 
                                    name="opt" 
                                    required
                                    value={opt}
                                    
                                    checked= {selectedAnswer === opt}
                                    onChange={handleSelection}
                                    />
                                    {opt}
                            </label>
                            </div>
                        )                  
                    })
                    }
                    <input  type="Submit" className="Submit"/>
            </form>    
        </div>
    )
}

export default QuestionCard;
import {Quiz, QuestionTypes} from './../Types/quizTypes'

export const shuffleArray = (array: any[]) => (
    [...array].sort(() => Math.random() - 0.5)
)

export const getQuizDetails = async(totalQuestions: number, levelQuestions:string): Promise<QuestionTypes[]> => {
    const res = await fetch (`https://opentdb.com/api.php?amount=${totalQuestions}&category=9&difficulty=${levelQuestions}&type=multiple`)
    let {results} = await res.json();
    const quiz: QuestionTypes[] = results.map((questionObj: Quiz, ind: number) => {
        return {
            question:questionObj.question,
            answer:questionObj.correct_answer,
            correct_answer: questionObj.correct_answer,
            option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    }
    )
    return quiz;
};

import styled from "styled-components";
// @ts-ignore
import { Gradient } from 'uigradients';
import {FC} from "react";



export const QuestionAndAnswer:FC<{answer:string,question:string,describe:string,url:string}> = ({answer,question,describe,url})=>{

    return <div>
        <h2>{question}</h2>
        <StyledQuestionAndAnswer>
            <Question gradient="day_tripper" angle={8}>
                <pre>
                {describe}
                </pre>
            </Question>
            <Answer>
                {answer}
                {/*本来想实现一个在线运行js的功能，但时间有限*/}
                <button onClick={()=>{
                    window.open(url)
                }}>前往codesandox验证运行结果</button>
            </Answer>
        </StyledQuestionAndAnswer>

    </div>
}





const StyledQuestionAndAnswer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;



const Question = styled(Gradient)`
  text-align: left;
  width: 100%;
  
`;

const Answer = styled.pre`
  padding: 0 24px;
`;


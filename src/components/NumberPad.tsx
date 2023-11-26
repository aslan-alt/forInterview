import styled from "styled-components";
import React, {useState} from "react";
import calculation from "../helper";

export const NumberPad = ()=>{

    const [isVisible,setIsVisible ] = useState(false)
    const [amount,setAmount] = useState("0")

    const onSubmit = ()=>{

    }
    const onClickButtonWrapper = (e:React.MouseEvent)=>{
        const text = (e.target as HTMLButtonElement).textContent
        if(text!==null){
            const id = (e.target as EventTarget & {id:string})?.id;
            const isInput = '1234567890.清空删除OK'.includes(text)
            setIsVisible(id==="amountInput" || isInput)

            if('1234567890.'.split('').concat(['清空','删除']).indexOf(text)>=0){
                setAmount(calculation(text,amount) ?? "0")
            }else if(text === 'OK'){
                onSubmit()
            }
        }
    }
    const handlingFee = (Number(amount) - 1000)*0.001;


    const tips = (()=>{
        if(Number(amount)>3000){
            return {
                message: "超出可用余额：3000",
                type: "error"
            }
        }else if(handlingFee>0){
            return {
                message:`预计收取手续费：${handlingFee}`,
                type:"tips"
            }
        }
    })()

    //其中可优化点比较多，而且为了快速实现，出现了不规范的代码也请谅解哈
    //根据移动端写的UI,暂不支持两测空白处点击隐藏,UI内点击可隐藏

    return <div>
        <StyledNumberPad onClick={onClickButtonWrapper}>
            <p>提现金额(可用余额：3000)</p>
            <p>{getCurrencyUnit(Number(amount))}</p>
            <Amount id="amountInput" value={amount} onChange={()=>{}}  />

            {tips && <p style={{color:tips.type==="error"?"red":""}}>{tips.message}</p>}

            <PadButtons $isVisible={isVisible} >
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>删除</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>清空</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button className="ok" disabled={Number(amount)>3000} onClick={()=>{
                    window.alert(`你当前提现金额：${amount}`)
                }}>OK</button>
                <button className="zero">0</button>
                <button>.</button>
            </PadButtons>

        </StyledNumberPad>

    </div>
}

const getCurrencyUnit = (amount:number)=>{

    if(amount>=1000&&amount<10000){
        return "千"
    }else if(amount>=10000&&amount<100000){
        return "万"
    }else if(amount>=100000&&amount<1000000){
        return "十万"
    }else if(amount>=1000000&&amount<10000000){
        return "百万"
    }else if(amount>=10000000&&amount<100000000){
        return "千万"
    }else {
        return ""
    }
}

const Amount = styled.input`
  background:white;
  font-size:36px;
  text-align:left;
  line-height:72px;
  padding:0 16px;
  box-shadow:inset 0 -5px 5px -5px rgba(0,0,0.25),
  inset 0 5px 5px -5px rgba(0,0,0.25);
`;

const PadButtons = styled.div<{$isVisible:boolean}>`
  margin-top: 100px;
  display:${({$isVisible})=>$isVisible?"block":"none"};
  button{
    width:25%;
    height:64px;
    float:left;
    border: none;
    font-size:18px;
    background: #ffffff;
    box-shadow:0 0 1px rgba(0,0,0,0.25);
    cursor: pointer;
    &.zero{
      width:50%
    }
    &.ok{
      height:128px;
      float:right;
      background: #1677ff;
      color: white;
      &:disabled{
        background: rgba(150, 150, 150, 0.06);
        color: #ced4d9;
      }
    }
  }

`;

const StyledNumberPad = styled.section`
    display:flex;
    flex-direction:column;
`;
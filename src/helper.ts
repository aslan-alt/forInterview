
const calculation = (text:string,output='0') => {

    if('1234567890'.indexOf(text)>=0){
        if(output.length>16){
            return output
        }
        if(output==='0'){
            return text
        }else{
            return output+text
        }
    }else if(text === '.'){
        console.log(text)
        if(output.indexOf('.')<0){
            console.log(output)
            return output+text
        }
    }else if(text==='删除'){
        if(output.length>1){
            if(output[output.length-2]==='.'){
                return output.slice(0,-2)
            }else{
                return output.slice(0,-1)
            }
        }else{
            return '0'
        }
    }else if(text === '清空'){
        return '0'
    }
}
export default calculation

import {FC} from "react";
import {QuestionAndAnswer} from "./QuestionAndAnswer";


const describe = `
// [ > … ] 表示调用函数后的打印内容

// arrange('William').execute();
// > William is notified

// arrange('William').do('commit').execute();
// > William is notified
// > Start to commit

// arrange('William').wait(5).do('commit').execute();
// > William is notified
// 等待 5 秒
// > Start to commit

// arrange('William').waitFirst(5).do('push').execute();
// 等待 5 秒
// > William is notified
// > Start to push

function arrange(taskId) {
    /**
     * 此处写代码逻辑
     */


}
//或使用类组件, 如果使用类组件，调用形式可以改为： new arrange('William').execute();
class arrange {

 }
            `
const answer = `
const doFn = (taskName) => {
  console.log(\`Start to \${taskName}\`);
};

const awaitFn = async function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, awaitFn.time * 1000);
  });
};
// 因为沙盒环境的问题导致awaitFn.constructor.name 不是期望的AsyncFunction，所以用这样的方式
awaitFn.isAsync = true;

// 按理说可以直接复用awaitFn，因为bind在这个环境导致async方法变同步
const waitFirst = async function () {
  return new Promise((resolve) => {
    console.log(\`waitFirst正在等待， \${waitFirst.time}秒后执行下一个task\`)
    setTimeout(() => {
      resolve();
    }, waitFirst.time * 1000);
  });
};
waitFirst.isAsync = true;

function arrange(taskId) {
  const api = {
    taskList:[],
    init: () => {
      if (taskId) {
        api.taskList.push(api.notified.bind(api, taskId));
      }
    },
    notified: (taskName) => {
      console.log(\`\${taskName} is notified\`);
      return api;
    },
    do: (taskName) => {
      api.taskList.push(doFn.bind(undefined, taskName));
      return api;
    },
    wait: (time)=> {
      awaitFn.time = time
      api.taskList.push(awaitFn);
      return api;
    },
    waitFirst:(time)=>{
      waitFirst.time = time
      
      api.taskList = [waitFirst,...api.taskList];
        return api
    },
    execute: async () => {
      for (let taskFn of api.taskList) {
        if (taskFn.isAsync) {
          await taskFn();
        }else{
            taskFn();
        }
      }
    },
  };
  api.init();
  return api;
}
// 注意：为了更清楚看到执行结果，请不要出现多次arrange调用,开始测其它的case的时候需要注释上一条
// arrange('William').execute();
// > William is notified



// arrange('William').do('commit').execute();
// > William is notified
// > Start to commit

// arrange('William').wait(5).do('commit').execute();
// > William is notified
// 等待 5 秒
// > Start to commit

// arrange('William').waitFirst(5).do('push').execute();
// 等待 5 秒
// > William is notified
// > Start to push

`



export const Arrange:FC = ()=>{
    return <QuestionAndAnswer
        question="实现一个 arrange 函数/class，可以进行时间和工作调度"
        url={`https://codesandbox.io/p/sandbox/busy-ganguly-cw97yd?file=%2Fsrc%2Findex.mjs%3A84%2C4`}
        answer={answer}
        describe={describe}
    />
}



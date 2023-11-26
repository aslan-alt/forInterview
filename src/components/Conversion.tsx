import {QuestionAndAnswer} from "./QuestionAndAnswer";


const question = `
实现一个函数，可以将数组转化为树状数据结构
// 入参格式参考：
const arr = [
  { id: 1, name: "i1" },
  { id: 2, name: "i2", parentId: 1 },
  { id: 4, name: "i4", parentId: 3 },
  { id: 3, name: "i3", parentId: 2 },
  { id: 8, name: "i8", parentId: 7 }
];
// 出参格式可自行设计, 举例：
{
  id: 1,
  name: 'i1',
  children: [
    {
      id: 2,
      name: 'i2',
      children: []
    }
  ]
}

function buildTree(arr) {
  /**
   * 此处写代码逻辑
   */
  
}`


const answer = `
function buildTree(arr) {
  const tree = [];
  const arrMap = new Map();
  for (let item of arr) {
    if ([undefined, null].includes(item.id) || arrMap.has(item.id)) {
      throw Error("id为必填项以及请确保id的唯一性");
    }
    arrMap.set(item.id, item);
  }
  for (let item of arr) {
    const { parentId = 0 } = item;
    const parentNode = arrMap.get(parentId);
    if (parentId === 0) {
      tree.push(item);
    } else {
      if (parentNode) {
        parentNode.children = parentNode.children
          ? [...parentNode.children, item]
          : [item];
      } else {
        console.log(
          \`array中未找到parentId为\${item.parentId}的节点,所以不处理此节点\`,
        );
      }
    }
  }
  return tree
}

const tree = buildTree([
  { id: 1, name: "i1" },
  { id: 2, name: "i2", parentId: 1 },
  { id: 4, name: "i4", parentId: 3 },
  { id: 5, name: "i4", parentId: 3 },
  { id: 3, name: "i3", parentId: 2 },
  { id: 8, name: "i8", parentId: 7 },
]);

`;
export const Conversion = ()=>{
    return <QuestionAndAnswer answer={answer} describe={question} question="实现一个函数，可以将数组转化为树状数据结构" url={`https://codesandbox.io/p/sandbox/funny-shockley-4z26sq?file=%2Fsrc%2Findex.mjs%3A1%2C1-29%2C1`} />
}
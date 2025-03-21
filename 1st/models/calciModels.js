let windowPrevState =[];
let windowCurrState =[];
const WINDOW_SIZE=10;

exports.updates = (newNums)=>{
    windowPrevState=[...windowCurrState];

    const allNums=[...new Set([...windowCurrState,...newNums])];
    windowCurrState=allNums.slice(-WINDOW_SIZE);

    const sum=windowCurrState.reduce((acc,val)=>acc+val,0);
    const avg=(sum/windowCurrState.length).toFixed(2);

    return{
        windowPrevState,
        windowCurrState,
        numbers: newNums,
        avg: parseFloat(avg)
    };
}
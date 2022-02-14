
const displayWork = document.querySelector('.display-work');
const displayResult = document.querySelector('.display-result');
const buttons = document.querySelectorAll('.button');
const equals = document.querySelector('.equals');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const erase = document.querySelector('.erase');

let toCalculate = '0';
let holdResult = '';
let heldContent = '';

buttons.forEach(element => element.addEventListener('click', addNumToDisplay));
operators.forEach(element => element.addEventListener('click', addOperatorToDisplay));
equals.addEventListener('click', giveResult);
clear.addEventListener('click', clearAll);
erase.addEventListener('click', e => {
    //console.log('calc b4 erase-- ' + toCalculate);
    if(!heldContent){
        return;
    }
    let newHeld = heldContent.split('').filter(element => {return !(element == '')});
    let newCalc = '';
    newHeld.pop();
    //console.log('held array--- ' + newHeld)
    if(newHeld.length == 0){
        heldContent = '';
        displayResult.textContent = '0';
        newCalc = toCalculate.split('')/*.filter(element => {return !(element == '')})*/;
        //console.log('new Calc array--- ' + newCalc)
        newCalc.pop();
        newCalc.push('0');
        //toCalculate = newCalc.join('');
    }else{
        heldContent = newHeld.join('')
        newCalc = toCalculate.split('')/*.filter(element => {return !(element == '')})*/;
        //console.log('new Calc array--- ' + newCalc)
        newCalc.pop();
        //toCalculate = newCalc.join('');
        displayResult.textContent = heldContent;
    }

    toCalculate = newCalc.join('');
    //console.log('calc on erase-- ' + toCalculate);
    //console.log('held cont after eras---- ' + heldContent)
})


function addNumToDisplay(){

    if(!(!holdResult)){
        clearAll();
    }
    
    heldContent += this.textContent;

    if(displayResult.textContent == '0' || lastIsOperator(toCalculate)){
        displayResult.textContent = this.textContent;
    }else{
        displayResult.textContent += this.textContent;
    }
    if(toCalculate == '0'){
        toCalculate = this.textContent;
    
    }else{toCalculate += this.textContent;}
    //console.log('held cont---- ' + heldContent)
    //console.log('add num funt-- ' + toCalculate);
}

function addOperatorToDisplay(){

    heldContent = '';
    if(toGiveResult(toCalculate)){
        giveResult();
    }

    if(lastIsOperator(toCalculate)){
        dontAddOperator(this.textContent);

    }else{
        
        ifNegativeValue();
        
        if(!holdResult){
            displayWork.textContent += toCalculate;
        }else{
            displayWork.textContent += holdResult;
            toCalculate = holdResult;
            holdResult = '';
        }
        
        displayWork.textContent += this.textContent;
        toCalculate += this.textContent;
        //console.log(toCalculate);
    }
    
    //console.log(toCalculate);
}

function giveResult(){

    let result = 0;
    let value = toCalculate.split(' ');
    
    if(lastIsOperator(toCalculate)){
        
        result = Number(operator(Number(value[0]), value[1], Number(value[0])));
        if(!Number.isInteger(result)){
            displayResult.textContent = result.toFixed(5).toString();
            holdResult = result.toFixed(5).toString();
        }else{
            displayResult.textContent = result.toString();
            holdResult = result.toString();
        }
    }else{

        result = Number(operator(Number(value[0]), value[1], Number(value[2])));
        if(!Number.isInteger(result)){
            displayResult.textContent = result.toFixed(5).toString();
            holdResult = result.toFixed(5).toString();
        }else{
            displayResult.textContent = result.toString();
            holdResult = result.toString();
        }
    }
    
    displayWork.textContent = '';
    toCalculate = '0';
    heldContent = '';
}

function clearAll(){
    toCalculate = '0';
    holdResult = '';
    heldContent = '';
    displayResult.textContent = '0';
    displayWork.textContent = '';
}

function ifNegativeValue(){
    if(this.textContent != ' - ' && toCalculate.includes('0 -')){

        let split = toCalculate.split(' ');
        displayResult.textContent = '-' + split[2];
        displayWork.textContent = '';
        toCalculate = displayResult.textContent;
    }
}

function dontAddOperator(textContentVal){
    let setDisplay = toCalculate.split(' ');
    setDisplay.splice(setDisplay.length -2, 2, textContentVal);
    toCalculate = setDisplay.join('');
    displayWork.textContent = toCalculate;
}

function toGiveResult(string){
    let split = string.split(' ').filter(element => {return !(element == '')});
    let theLast = split[split.length -2];
    let isOperator = false;

    switch(theLast){
        case '+' : isOperator = true; break;
        case '-' : isOperator = true; break;
        case '*' : isOperator = true; break;
        case '/' : isOperator = true;
    }
    return isOperator;
}

function lastIsOperator(string){
    let split = string.split(' ').filter(element => {return !(element == '')});
    let theLast = split[split.length -1];
    let isOperator = false;

    switch(theLast){
        case '+' : isOperator = true; break;
        case '-' : isOperator = true; break;
        case '*' : isOperator = true; break;
        case '/' : isOperator = true;
    }
    return isOperator;
}

function operator(val1, opt, val2){
    let result = 0;
    
    switch(opt){
        case '+':
            result = addition(val1, val2);
            break;
        case '-':
            result = subtraction(val1, val2);
            break;
        case '*':
            result = multiplication(val1, val2);
            break;
        case '/':
            result = division(val1, val2);
    }
    return result;
}

function addition(val1, val2){
    return val1 + val2;
}

function subtraction(val1, val2){
    return val1 - val2;
}

function multiplication(val1, val2){
    return val1 * val2;
}

function division(val1, val2){
    return val1 / val2;
}

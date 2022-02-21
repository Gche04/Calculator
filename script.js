
const displayWork = document.querySelector('.display-work');
const displayResult = document.querySelector('.display-result');
const buttons = document.querySelectorAll('.button');
const equals = document.querySelector('.equals');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const erase = document.querySelector('#erase');

let toCalculate = '0';
let holdResult = '';
let heldContent = '';

window.addEventListener('keydown' , e => {
    keyBoardSupport(e);
});

buttons.forEach(element => element.addEventListener('click', addNumToDisplay));
operators.forEach(element => element.addEventListener('click', addOperatorToDisplay));
equals.addEventListener('click', giveResult);
clear.addEventListener('click', clearAll);
erase.addEventListener('click', eraser);


//---

function addNumToDisplay(){

    if(displayResult.textContent == 'check input!'){
        return;
    }

    if(!(!holdResult)){
        clearAll();
    }
    
    if(heldContent.includes('.') && this.textContent == '.'){
        return;
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
}

function addOperatorToDisplay(){

    if(displayResult.textContent == 'check input!'){
        return;
    }

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
    }
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
        if (result == Infinity){
            result = '';
            displayResult.textContent = 'check input!';
            holdResult = '';
        }
        else if(!Number.isInteger(result)){  
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

function eraser(){

    if(!heldContent){
        return;
    }
    let newHeld = heldContent.split('').filter(element => {return !(element == '')});
    let newCalc = '';
    newHeld.pop();

    if(newHeld.length == 0){
        heldContent = '';
        displayResult.textContent = '0';
        newCalc = toCalculate.split('');
        newCalc.pop();
        newCalc.push('0');
    }else{
        heldContent = newHeld.join('')
        newCalc = toCalculate.split('');
        newCalc.pop();
        displayResult.textContent = heldContent;
    }

    toCalculate = newCalc.join('');
}

function clearAll(){
    toCalculate = '0';
    holdResult = '';
    heldContent = '';
    displayResult.textContent = '0';
    displayWork.textContent = '';
}

function keyBoardSupport(e){
    
    const forButtons = document.querySelector(`[data-button="${e.key}"]`);
    const forOperators = document.querySelector(`[data-operator="${e.key}"]`);
        
    if(!(!forButtons)){
        addNumKeyboardSupport(e);
    }
    else if(!(!forOperators)){
        let opt = ' ' + e.key + ' ';
        addOperatorKeyboardSupport(opt);
    }
    else if(e.key == '='){
        giveResult();
    }
    else if(e.key == "Backspace"){
        eraser();
    }
    else if(e.key == "Escape"){
        clearAll();
    }
    else{return;}
    
}

function addNumKeyboardSupport(e){

    if(displayResult.textContent == 'check input!'){
        return;
    }

    if(!(!holdResult)){
        clearAll();
    }
    
    if(heldContent.includes('.') && e.key == '.'){
        return;
    }

    heldContent += e.key;

    if(displayResult.textContent == '0' || lastIsOperator(toCalculate)){
        displayResult.textContent = e.key;
    }else{
        displayResult.textContent += e.key;
    }
    if(toCalculate == '0'){
        toCalculate = e.key;
    
    }else{toCalculate += e.key;}
}

function addOperatorKeyboardSupport(optSel){

    if(displayResult.textContent == 'check input!'){
        return;
    }

    heldContent = '';
    if(toGiveResult(toCalculate)){
        giveResult();
    }

    if(lastIsOperator(toCalculate)){
        dontAddOperator(optSel);

    }else{
        
        ifNegativeValue();
        
        if(!holdResult){
            displayWork.textContent += toCalculate;
        }else{
            displayWork.textContent += holdResult;
            toCalculate = holdResult;
            holdResult = '';
        }
        
        displayWork.textContent += optSel;
        toCalculate += optSel;
    }
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

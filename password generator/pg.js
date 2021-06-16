//DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

// generate password event listener
generateEl.addEventListener('click', ()=> {

const length = +lengthEl.value;
const hasLower = lowercaseEl.checked; //checked is used for whether check box is ticked or not
const hasUpper = uppercaseEl.checked;
const hasNumber = numbersEl.checked;
const hasSymbols = symbolsEl.checked;

result.innerText= generatePassword(
	hasLower,
	hasUpper,
	hasNumber,
	hasSymbols,
	length
);
});

function generatePassword(lower,upper,number,symbol,length){
let generatedPassword ='';

const typesCount = lower + upper + number + symbol;

const typesArr=[{lower},{upper},{number},{symbol}].filter(item =>Object.values(item)[0]);
 // console.log('typesArr',typesArr);

 if (typesCount === 0) {
 	return '';
 }

 for(let i=0; i<length; i += typesCount){
 	typesArr.forEach(type => {

 		const funcName=Object.keys(type)[0];

 		generatedPassword += randomFunc[funcName]();
 	});
 }
 	const finalPassword=generatedPassword.slice(0, length);

 	return finalPassword;
}

//generate function

function getRandomLower(){
return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}
// console.log(getRandomLower());
function getRandomUpper(){
return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}
// console.log(getRandomUpper());
function getRandomNumber(){
return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}
// console.log(getRandomNumber());
function getRandomSymbol(){
const symbol = '!@#$%^&*(){}[]=<>/,.';
return symbol[Math.floor(Math.random()*symbol.length)];

}
// console.log(getRandomSymbol());

//copy to clipboard
clipboardEl.addEventListener('click', ()=>{

	const textarea=document.createElement('textarea');
	const password = resultEl.innerText;

	if(!password){
		return;
	}

	textarea.value=password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password Copied!!!');
});
const dropdownS = document.querySelectorAll(".dropdown select");

const btn = document.querySelector(".changeBtn");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const change_btn = document.querySelector(".icon-button");


const msg = document.querySelector(".msg");
for(let select of dropdownS){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}  


const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

change_btn.addEventListener("click" ,async(evt)=>{
    evt.preventDefault();
    var chan = toCurr.value;
    toCurr.value = fromCurr.value;
    fromCurr.value = chan;
    updateFlag(fromCurr);
    updateFlag(toCurr);
});


btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 0){
        amtVal = 1;
        amount.value = "1";
    }
    console.log(toCurr.value);
var apiKey = //Enter Your API KEY;
const BASE_URL =`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurr.value}/${toCurr.value}`;
let response = await fetch(`${BASE_URL}`);
let data = await response.json();
let temp = toCurr.value.toUpperCase(); 

try{
    if(isValidNumber(amtVal) === true){
        let finalAmount = data.conversion_rate*amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }
    else{
        msg.innerText = "PLEASE ENTER A VALID NUMBER";
    }
}
catch(error){
    console.log(error);
    msg.innerText = "SERVER 404 ERROR";
}
});


function isValidNumber(value) {
    const numberPattern = /^-?\d+(\.\d+)?$/;
    return numberPattern.test(value) && isFinite(parseFloat(value));
}
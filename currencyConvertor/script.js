//currency converter

const API_KEY = "99102e303b2e2de09c1546b7";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg-container");
// const msg2 = document.getElementsByClassName("msg-container")[0];

const updateExchangeRate = async () => {
  let amount = document.querySelector(".input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    amount.value = "1";
  }
  let url = `${BASE_URL}/pair/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
  const response = await fetch(url); //json format
  let data = await response.json(); //turns to object format

  // 'conversion_rate' is a property in the response data object.
  // It represents the exchange rate for the currency conversion.
  let rate = data.conversion_rate;
  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

const updateImg = (element) => {
  let img = element.parentElement.querySelector("img");
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  img.src = newSrc;
};

for (let select of dropdowns) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateImg(event.target);
  });
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

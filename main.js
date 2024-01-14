// grab the dom element
// the form
const form = document.getElementById("splitterForm");
// inputs
const billInput = document.getElementById("billInput");
const tipInput = document.getElementById("tipInput");
const personInput = document.getElementById("personInput");
// buttons
const tipButtons = document.querySelectorAll(".tip-list > .btn");
const resetBtn = document.getElementById("reset");
// output divs
const tipOutput = document.getElementById("tipAmount");
const totalOutput = document.getElementById("total");

// global variables
let bill = 0;
let numberOfPeople = 0;
let tip = 0;

billInput.addEventListener("input", (e) => {
  if (!e.target.valueAsNumber) return;
  bill = e.target.valueAsNumber;
  calcTip();
});
tipInput.addEventListener("input", (e) => {
  if (!e.target.valueAsNumber) return;
  tip = e.target.valueAsNumber;
  document.querySelector("[data-selected]").removeAttribute("data-selected");
  calcTip();
});
personInput.addEventListener("input", (e) => {
  if (!e.target.valueAsNumber) return;
  numberOfPeople = e.target.valueAsNumber;
  calcTip();
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipInput.value = "";
    tip = +e.target.innerText.slice(0, -1);
    console.log(tip);
    if (!document.querySelector("[data-selected]")) {
      e.target.setAttribute("data-selected", "");
      return;
    }
    document.querySelector("[data-selected]").removeAttribute("data-selected");
    e.target.setAttribute("data-selected", "");
    calcTip();
  });
});

function calcTip() {
  if (!tip || !bill || !numberOfPeople) {
    resetOutput();
    return;
  }
  resetBtn.removeAttribute("data-disabled");
  const billPerPerson = bill / numberOfPeople;
  const tipPerPerson = (bill * (tip / 100)) / numberOfPeople;
  const totalPerPerson = billPerPerson + tipPerPerson;
  tipOutput.innerText = tipPerPerson.toFixed(2);
  totalOutput.innerText = totalPerPerson.toFixed(2);
}

function resetOutput() {
  document.querySelector("[data-selected]")?.removeAttribute("data-selected");
  resetBtn.setAttribute("data-disabled", "");
  tipOutput.innerText = "0.00";
  totalOutput.innerText = "0.00";
}

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  tipInput.value = "";
  personInput.value = "";
  bill = 0;
  tip = 0;
  numberOfPeople = 0;
  resetOutput();
});

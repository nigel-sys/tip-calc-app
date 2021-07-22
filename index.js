const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const bill = document.querySelector("#bill");
let billAmount = 0;
bill.addEventListener("input", (event) => {
  document.querySelector(".reset").disabled = false;
  billAmount = event.target.value;
  calc();
});

const nop = document.querySelector("#nop");
let numOfPeople = 0;
nop.addEventListener("input", (event) => {
  document.querySelector(".reset").disabled = false;
  if (event.target.value == 0) {
    document.querySelector(".nop-span").innerHTML = "Can't be zero";
    nop.style.border = "solid 2px rgb(214, 139, 0)";
  } else {
    document.querySelector(".nop-span").innerHTML = "";
    nop.style.border = "none";
    numOfPeople = event.target.value;
    calc();
  }
});

if (billAmount || numOfPeople === 0) {
  document.querySelector(".reset").disabled = true;
}

const tipBtn = document.querySelectorAll(".tipBtn");
let tip = 0;
for (let i = 0; i < tipBtn.length; i++) {
  "click input".split(" ").forEach(function (e) {
    tipBtn[i].addEventListener(e, (event) => {
      const current = document.querySelectorAll(".active");

      if (current.length > 0) {
        current[0].classList.remove("active");
      }
      tipBtn[i].classList.add("active");
      tip = Number(event.target.value);
      calc();
    });
  });
}

const calc = () => {
  let billPerPerson = billAmount / numOfPeople;
  let tipAmountPerPerson = Number(
    (Math.round(billPerPerson * (tip / 100) * 100) / 100).toFixed(2)
  );
  let total = billPerPerson + tipAmountPerPerson;
  let totalPerPerson = Number((Math.round(total * 100) / 100).toFixed(2));

  if (
    isFinite(tipAmountPerPerson || totalPerPerson) &&
    !isNaN(tipAmountPerPerson || totalPerPerson)
  ) {
    const tipAmt = document.querySelector(".tipAmt");
    tipAmt.innerHTML = `$${tipAmountPerPerson}`;
    const total = document.querySelector(".total");
    total.innerHTML = `$${totalPerPerson}`;
  }
};

document.querySelector(".reset").addEventListener("click", (event) => {
  location.reload();
  return false;
});

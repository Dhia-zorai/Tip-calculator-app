document.addEventListener("DOMContentLoaded", function () {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("number");
  const tipButtons = document.querySelectorAll(".tips button");
  const customInput = document.querySelector(".custom-input");
  const amountValue = document.querySelector(".amount-value");
  const totalValue = document.querySelector(".total-value");
  const billError = document.querySelector(".bill-error");
  const numberError = document.querySelector(".number-error");
  let selectedTip = null;

  function calculate() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value, 10);
    let tipPercent = selectedTip;
    if (
      customInput &&
      customInput.style.display !== "none" &&
      customInput.value
    ) {
      tipPercent = parseFloat(customInput.value) / 100;
    }
    // Error handling and border
    if (!bill || bill <= 0) {
      billError.classList.add("active");
      billInput.classList.add("active");
    } else {
      billError.classList.remove("active");
      billInput.classList.remove("active");
    }
    if (!people || people <= 0) {
      numberError.classList.add("active");
      peopleInput.classList.add("active");
    } else {
      numberError.classList.remove("active");
      peopleInput.classList.remove("active");
    }
    if (bill > 0 && people > 0 && tipPercent !== null && !isNaN(tipPercent)) {
      const tipAmount = (bill * tipPercent) / people;
      const total = (bill + bill * tipPercent) / people;
      amountValue.textContent = `$${tipAmount.toFixed(2)}`;
      totalValue.textContent = `$${total.toFixed(2)}`;
    } else {
      amountValue.textContent = "$0.00";
      totalValue.textContent = "$0.00";
    }
  }

  billInput.addEventListener("input", calculate);
  peopleInput.addEventListener("input", calculate);
  tipButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      tipButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      if (this.classList.contains("custom-percent")) {
        customInput.style.display = "block";
        customInput.focus();
        selectedTip = null;
      } else {
        customInput.style.display = "none";
        selectedTip = parseFloat(this.value);
      }
      calculate();
    });
  });
  if (customInput) {
    customInput.addEventListener("input", function () {
      tipButtons.forEach((b) => b.classList.remove("active"));
      calculate();
    });
  }
});

document.querySelector(".RESET").addEventListener("click", () => {
  location.reload();
});

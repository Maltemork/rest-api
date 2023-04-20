"use strict";
window.addEventListener("load", initApp);

function initApp() {
  console.log("app loaded");
  document.querySelector("#signup").addEventListener("submit", submitClick);
  document
    .querySelector("#accept-checkbox")
    .addEventListener("click", acceptClick);
}

function submitClick(event) {
  event.preventDefault();

  console.log(event);

  const elements = document.querySelector("#signup").elements;

  const signup = {
    fullname: elements.fullname.value,
    email: elements.email.value,
    username: elements.username.value,
    password: elements.password.value,
    payment: elements.payment.value,
    paymentcycle: elements.paymentPlan.value,
    spam: elements.spam.checked,
    accept: elements.accept.checked,
  };

  console.log(signup);
}

function acceptClick(event) {
  if (event.target.checked === false) {
    document.querySelector("#form-submit-btn").disabled = true;
  } else {
    document.querySelector("#form-submit-btn").disabled = false;
  }
}

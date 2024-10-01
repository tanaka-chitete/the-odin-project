function checkEmail() {
  const emailInput = document.querySelector("#email");

  const emailConstraint =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (emailConstraint.test(emailInput.value)) {
    emailInput.setCustomValidity("");
  } else {
    emailInput.setCustomValidity("Email must be in the standard format");
    emailInput.reportValidity();
  }
}

window.onload = () => {
  document.querySelector("#email").onblur = checkEmail;
};

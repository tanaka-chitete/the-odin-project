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

function checkZipCode() {
  // For each country, defines the pattern that the zip code has to follow
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss zip codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French zip codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German zip codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch zip codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  // Read the country id
  const country = document.getElementById("country").value;

  // Get the NPA field
  const zipCodeInput = document.getElementById("zip-code");

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");

  // Check it!
  if (constraint.test(zipCodeInput.value)) {
    // The zip code follows the constraint, we use the ConstraintAPI to tell it
    zipCodeInput.setCustomValidity("");
  } else {
    // The zip code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    zipCodeInput.setCustomValidity(constraints[country][1]);
    zipCodeInput.reportValidity();
  }
}

window.onload = () => {
  document.querySelector("#email").onblur = checkEmail;
  document.querySelector("#zip-code").onblur = checkZipCode;
  document.querySelector("#country").oninput = checkZipCode;
};

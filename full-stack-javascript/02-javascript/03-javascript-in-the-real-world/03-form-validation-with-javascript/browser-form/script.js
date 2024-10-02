const email = document.querySelector("#email");
email.addEventListener("blur", () => {
  const emailError = document.querySelector(".error_field_email");
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.classList.remove("active");
  } else {
    if (email.validity.valueMissing) {
      emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
      emailError.textContent = `Email should be at least ${email.minLength} characters`;
    }
    emailError.classList.add("active");
  }
});

const zipCode = document.querySelector("#zip-code");
zipCode.addEventListener("blur", (event) => {
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
  const zipCodeError = document.querySelector(".error_field_zip-code");
  if (constraint.test(zipCodeInput.value)) {
    // The zip code follows the constraint, we use the ConstraintAPI to tell it
    zipCodeInput.setCustomValidity("");
    zipCodeError.textContent = "";
    zipCodeError.classList.remove("active");
  } else {
    // The zip code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    zipCodeInput.setCustomValidity(constraints[country][1]);
    zipCodeError.textContent = constraints[country][1];
    zipCodeError.classList.add("active");
  }
});

const password = document.querySelector("#password");
password.addEventListener("blur", () => {
  const passwordError = document.querySelector(".error_field_password");
  if (password.value.length >= 8) {
    password.setCustomValidity("");
    passwordError.textContent = "";
    passwordError.classList.remove("active");
  } else {
    password.setCustomValidity("Password must be 8 characters long");
    passwordError.textContent = "Password must be 8 characters long";
    passwordError.classList.add("active");
  }
});

const passwordConfirmation = document.querySelector("#password-confirmation");
passwordConfirmation.addEventListener("blur", () => {
  const password = document.querySelector("#password");
  const passwordError = document.querySelector(
    ".error_field_password-confirmation"
  );
  if (
    passwordConfirmation.value.length >= 8 &&
    password.value === passwordConfirmation.value
  ) {
    passwordConfirmation.setCustomValidity("");
    passwordError.textContent = "";
    passwordError.classList.remove("active");
  } else if (passwordConfirmation.value.length < 8) {
    passwordConfirmation.setCustomValidity(
      "Password must be 8 characters long"
    );
    passwordError.textContent = "Password must be 8 characters long";
    passwordError.classList.add("active");
  } else {
    passwordConfirmation.setCustomValidity("Passwords must match");
    passwordError.textContent = "Passwords must match";
    passwordError.classList.add("active");
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.handleSubmitForm = handleSubmitForm;
  }

  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      let hasError = false;

      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (self.validateFields(input)) {
          hasError = true;
        }
      });

      if (!hasError) {
        let result = {};
        self.fields.forEach((field) => {
          const input = document.querySelector(`#${field}`);
          result[field] = input.value;
        });
        handleSubmitForm(result);
      }
    });
  }

  validateOnEntry() {
    let self = this;
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);

      input.addEventListener("input", (event) => {
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    let hasError = false;
    // Check presence of values
    if (field.value.trim() === "") {
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} is required`,
        "error"
      );
      hasError = true;
    } else {
      this.setStatus(field, null, "success");
      hasError = false;
    }

    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
        hasError = false;
      } else {
        this.setStatus(field, "Please enter valid email address", "error");
        hasError = true;
      }
    }

    // Password confirmation edge case
    if (field.id === "password_confirmation") {
      const passwordField = this.form.querySelector("#password");

      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error");
        hasError = true;
      } else if (field.value != passwordField.value) {
        this.setStatus(field, "Password does not match", "error");
        hasError = true;
      } else {
        this.setStatus(field, null, "success");
        hasError = false;
      }
    }
    return hasError;
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector(".error-message");

    if (status === "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }

    if (status === "error") {
      field.parentElement.querySelector(".error-message").innerText = message;
      field.classList.add("input-error");
    }
  }
}

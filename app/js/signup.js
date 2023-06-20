// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// LOGIN/REGISTER ANIMATION

const showHidePassword = (toggleField, passwordField) => {
  const togglePassword = document.getElementById(toggleField);
  const password = document.getElementById(passwordField);
  const classIconShow = "fa-eye";
  const classIconHide = "fa-eye-slash";

  togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    const hasIconHide = this.classList.contains(classIconHide);
    // toggle the icon
    if (hasIconHide) {
      this.classList.remove(classIconHide);
      this.classList.add(classIconShow);
    } else {
      this.classList.remove(classIconShow);
      this.classList.add(classIconHide);
    }
  });
};

const handleSubmitForm = (data) => {
  console.log(data);
};

window.onload = () => {
  const form = document.querySelector("#form");
  const fields = ["name", "email", "password", "password_confirmation"];

  showHidePassword("togglePassword", "password");
  showHidePassword("togglePasswordConfirm", "password_confirmation");

  const validator = new FormValidator(form, fields, handleSubmitForm);
  validator.initialize();
};

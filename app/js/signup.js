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
  const API = new FetchWrapper(
    "https://6491c6322f2c7ee6c2c8e184.mockapi.io/api/v1/"
  );
  data["avatar"] = "http://www.gravatar.com/avatar/?d=identicon";
  delete data["password_confirmation"];
  API.get("users").then((users) => {
    const user = users.find(function (user) {
      return user.email === data["email"];
    });
    if (user) {
      const errorMessage = document.querySelector(".error-message-form");
      if (errorMessage) {
        errorMessage.innerText = "User đã tồn tại";
      }
    } else {
      API.post("users", data).then((_) => navigation.navigate("/"));
    }
  });
};

window.onload = () => {
  const form = document.querySelector("#form");
  const fields = ["name", "email", "password", "password_confirmation"];

  showHidePassword("togglePassword", "password");
  showHidePassword("togglePasswordConfirm", "password_confirmation");

  const validator = new FormValidator(form, fields, handleSubmitForm);
  validator.initialize();
};

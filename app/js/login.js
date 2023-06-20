// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// LOGIN/REGISTER ANIMATION

const showHidePassword = () => {
  const togglePassword = document.querySelector("#togglePassword");
  const password = document.querySelector("#password");
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
  API.get("users").then((users) => {
    const authenticatedUser = users.find(function (user) {
      return user.email === data["email"] && user.password === data["password"];
    });
    if (authenticatedUser) {
      navigation.navigate("/");
    } else {
      const errorMessage = document.querySelector(".error-message-form");
      if (errorMessage) {
        errorMessage.innerText = "Sai tên đăng nhập hoặc mật khẩu";
      }
    }
  });
};

window.onload = () => {
  const form = document.querySelector("#form");
  const fields = ["email", "password"];

  showHidePassword();
  const validator = new FormValidator(form, fields, handleSubmitForm);
  validator.initialize();
};

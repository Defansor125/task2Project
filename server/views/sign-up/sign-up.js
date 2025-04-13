const userName = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const button = document.getElementById("sign-up-button");
const birthdate = document.getElementById("date");
const profilePicture = document.getElementById("profile-picture");

// let user = {
//   email: "",
//   password: "",
//   name: "",
//   surname: "",
//   birthdate: "",
// };

const errorMessages = {
  surname: "Surname is not valid",
  name: "Name is not valid",
  email: "Email is not valid or user with this email already exists",
  birthdate: "birthdate is not valid",
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (password.value === confirmPassword.value) {
    console.log("Passwords are the same");
    newUser();
  } else {
    console.log("Passwords are NOT the same");
  }
});

async function newUser() {
  try {
    const res = await fetch("/sign-up", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: userName.value,
        surname: surname.value,
        birthdate: birthdate.value,
      }),
    });
    const jsonBody = await res.json();
    if (jsonBody.success) {
      // window.location.href = "/profile";
      fetch("/profile");
    } else {
      // чат сделал, я чёто не понял. Надо разобраться
      Object.entries(jsonBody).forEach(([field, isValid]) => {
        // console.log(field, isValid);

        if (!isValid && errorMessages[field]) {
          alert(errorMessages[field]); //добавить красную обводку и вывод текстом, для каждого поля
        }
      });
    }
  } catch (error) {
    console.error("Ошибка при запросе:", error);
  }
}

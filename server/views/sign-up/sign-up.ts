const userName = document.getElementById("name") as HTMLInputElement;
const surname = document.getElementById("surname") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const confirmPassword = document.getElementById(
  "confirmPassword"
) as HTMLInputElement;
const button = document.getElementById("sign-up-button") as HTMLButtonElement;
const birthdate = document.getElementById("date") as HTMLInputElement;
const profilePicture = document.getElementById(
  "profile-picture"
) as HTMLFormElement; // поменять

// let user = {
//   email: "",
//   password: "",
//   name: "",
//   surname: "",
//   birthdate: "",
// };

const errorMessages: Record<string, string> = {
  surname: "Surname is not valid",
  name: "Name is not valid",
  email: "Email is not valid or user with this email already exists",
  birthdate: "birthdate is not valid",
};

//////

button.addEventListener("click", (e): void => {
  e.preventDefault();
  if (password.value === confirmPassword.value) {
    console.log("Passwords are the same");
    newUser();
  } else {
    console.log("Passwords are NOT the same");
  }
});

async function newUser(): Promise<void> {
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

console.log("startpage");

const mail = document.querySelector(".username-data input");
const password = document.querySelector(".password input");
const loginButton = document.querySelector(".buttons .log-in");
const signInButton = document.querySelector(".buttons .sign-up");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: mail.value, password: password.value }),
    });
    const data = await response.json();
    console.log("data: ", data);

    if (data.success) {
      // window.location.href = /profile (написать логику для перехода на страницу с правильным юзером)

      alert("All good");
    } else {
      // добавить красную обводку которая говорит что не правильно чё-то
      alert("Wrong email or password");
    }
  } catch (err) {
    console.log("Ошибка при отправке запроса", err);
  }
});

signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");

  window.location.href = "/sign-up";
});

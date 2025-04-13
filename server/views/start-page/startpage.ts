// @ ts-nocheck

console.log("startpage");

// const users = required("../../main.js");

const mail = document.querySelector(".username-data input") as HTMLInputElement;
const password = document.querySelector(".password input") as HTMLInputElement;
const loginButton = document.querySelector(".buttons .log-in")!;
const signInButton = document.querySelector(".buttons .sign-up")!;

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const emailData = mail.value;
  const passwordData = password.value;
  console.log(emailData, passwordData);

  try {
    const response: any = fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailData, passwordData }),
    });
    const data = await response;
    console.log("data: ", data);

    if (data.success) {
      // window.location.href = /profile (написать логику для перехода на страницу с правильным юзером)
    } else {
      alert("Wrong email or password");
    }
  } catch (err) {
    console.log("Ошибка при отправке запроса", err);
  }
});

// import fs from "fs";

let user = {
  email: "dasadsa",
  password: "asdad",
  firstName: "asdad",
  lastName: "asdasd",
  birthdate: "asdasd",
};

for (const key in user) {
  console.log(key);
}

let count = 0;
for (const key in user) {
  if (user[key]) {
    count += 1;
  }
  console.log(count);
}

import { promises as fs } from "fs";
const dbPath = "./server/db.json";

async function addUser(newUser) {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const users = JSON.parse(data); // это МАССИВ

    users.push(newUser); // пушим напрямую в массив

    await fs.writeFile(dbPath, JSON.stringify(users, null, 2), "utf-8");
    console.log("User successfully added!");
  } catch (err) {
    console.error("Error working with db.json:", err);
  }
}

addUser(user);
// function displayErrorMessage(userInfo) {
//   for (const key in userInfo) {
//     if (!key) {
//       return key;
//     }
//   }
// }

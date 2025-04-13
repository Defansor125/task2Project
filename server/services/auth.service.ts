import { promises as fs } from "fs";
import crypto from "crypto";

type ValidKeys = "email" | "password" | "name" | "surname" | "birthdate" | "id";
type User = Record<ValidKeys, string | null>;

export async function sha256(message: string | null) {
  if (!message) {
    return null;
  }
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export function validateName(name: string | null) {
  if (!name) return false;
  const regex = /^[\p{L}\s]+$/u;
  return regex.test(name);
}

export function validateEmail(email: string | null) {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function userValidation(user: User) {
  const validUser = user;
  if (!validateName(user.name)) validUser.name = null;
  if (!validateName(user.surname)) validUser.surname = null;
  if (!validateEmail(user.email)) validUser.email = null;
  if (!user.birthdate) validUser.birthdate = null;
  return validUser;
}

export async function addUser(newUser: User) {
  const requiredFields: ValidKeys[] = [
    "email",
    "password",
    "name",
    "surname",
    "birthdate",
  ];
  const hasAllFields = requiredFields.every((field) => newUser[field]);
  if (!hasAllFields) return false;

  try {
    newUser.password = await sha256(newUser.password);
    newUser.id = crypto.randomUUID();
    const data = await fs.readFile("./db.json", "utf-8");
    const users = JSON.parse(data);
    users.push(newUser);
    await fs.writeFile("./db.json", JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

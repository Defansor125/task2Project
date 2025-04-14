import dotenv from "dotenv";
dotenv.config({ path: "/server/env" });

console.log("Token:", process.env.SECRET_TOKEN);

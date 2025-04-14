import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import routes from "./routes/index.ts";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Настройки
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static("./views"));

// Подключаем все роуты
app.use(routes);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

export default app;

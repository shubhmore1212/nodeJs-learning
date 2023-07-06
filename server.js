import dotenv from "dotenv";

import { app } from "./index.js";
import { initDB } from "./utils/dbInitialize.js";

dotenv.config();

// Taking arguments from command line
const args = process.argv.splice(2);

const PORT = args[0]?.split("=")[1] || process.env.PORT || 8000;

initDB()
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

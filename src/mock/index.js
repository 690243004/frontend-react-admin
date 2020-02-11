import { isIE } from "@u/util";
if (process.env.NODE_ENV !== "production") {
  if (isIE()) {
    console.error(
      "ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV."
    );
  }
  require("mockjs2");
  require("./services/auth");
  console.log("mock is mount");
}

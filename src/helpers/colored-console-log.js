const dev =
  window.location.hostname == "localhost" || localStorage.developmentMode
    ? true
    : false;

import moment from "moment";

export default (message, color, data) => {
  color || "black";
  const time = "TIME -> " + moment().format("DD-MM-YYYY HH:mm:ss:ms") + " -> ";
  let type = "DEBUG -> ";
  switch (color) {
    case "success":
      type += "SUCCESS: ";
      color = "greenyellow";
      break;
    case "info":
      type += "INFO: ";
      color = "dodgerBlue";
      break;
    case "error":
      color = "red";
      type += "ERROR: ";
      break;
    case "warning":
      color = "orange";
      type += "WARNING ";
      break;
  }
  if (dev) {
    console.log(
      "%c" + type + time + message,
      "color:" + color,
      data ? data : ""
    );
  }
};

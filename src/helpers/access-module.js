import debug from "./colored-console-log.js";
const dev =
  window.location.hostname == "localhost" || localStorage.developmentMode
    ? true
    : false;

export default (module_name, component) => {
  if (dev) {
    debug("Компонент " + module_name + "_module инициализирован", "info");
    window[module_name + "_module"] = component;
  }
};

import { getUserIDs } from "./data.mjs";

const select = document.getElementById("user-select");
const userIds = getUserIDs();


window.onload = function () {
  for (const user of userIds) {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = "User " + user;
    select.appendChild(option);
  }

};

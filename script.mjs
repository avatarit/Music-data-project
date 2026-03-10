import { getUserIDs, getSong, getListenEvents } from "./data.mjs";

const selectUser = document.getElementById("user-select");
const userIds = getUserIDs();

window.onload = function () {
  for (const user of userIds) {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = "User " + user;
    selectUser.appendChild(option);
  }
};

selectUser.addEventListener("change", function () {
  const selectedUserId = selectUser.value;

  if (selectedUserId) {
    displayUserInfo(selectedUserId);
  } else {
    document.getElementById("user-info").innerHTML = "";
  }
});

function displayUserInfo(userId) {
  const userInfoDiv = document.getElementById("user-info");
  userInfoDiv.innerHTML = "";

  const listenEvents = getListenEvents(userId);

  if (listenEvents.length === 0) {
    userInfoDiv.textContent = "No listening events found for this user.";
    return;
  }

  const table = document.createElement("table");

  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    "<th>Song ID</th><th>Time</th><th>Seconds since midnight</th><th>Artist</th><th>Song Title</th><th>Duration</th><th>Genre</th>";
  table.appendChild(headerRow);

  for (let event of listenEvents) {

    const song = getSong(event.song_id);

    const row = document.createElement("tr");
  
    row.innerHTML =
      "<td>" + event.song_id + "</td>" +
      "<td>" + event.timestamp + "</td>" +
      "<td>" + event.seconds_since_midnight + "</td>" +
      "<td>" + song.artist + "</td>" +
      "<td>" + song.title + "</td>" +
      "<td>" + song.duration_seconds + "</td>" +
      "<td>" + song.genre + "</td>";
  
    table.appendChild(row);
  }

  userInfoDiv.appendChild(table);
}
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
      document.getElementById("user-info").innerHTML = ""; // Clear info if no user is selected


} }

  );

  function displayUserInfo(userId) {
    const userInfoDiv = document.getElementById("user-info");
    userInfoDiv.innerHTML = ""; // Clear previous info

    const listenEvents = getListenEvents(userId);
    if (listenEvents.length === 0) {
      userInfoDiv.textContent = "No listening events found for this user.";
      return;
    }

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Song ID</th><th>Time</th><th>Artist</th><th>Song Title</th><th>Duration</th> <th>Genra</th>";
    table.appendChild(headerRow);

    listenEvents.forEach(event => {
      const song = getSong(event.song_id);
    // const timestamp = getSong(event.timestamp);
      const artist = song ? song.artist : "Unknown Artist";
      const genre = song ? song.genre : "Unknown Genre";
      const duration = song ? song.duration_seconds : "Unknown Duration";

      const row = document.createElement("tr");
      row.innerHTML = `<td>${event.song_id}</td> <td>${event.timestamp}</td> <td>${artist}</td><td>${song ? song.title : "Unknown Title"}</td><td>${duration}</td><td>${genre}</td>`;
      table.appendChild(row);
    });

    userInfoDiv.appendChild(table);
  }
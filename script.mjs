import { getUserIDs, getListenEvents } from "./data.mjs";
import {getMostListenedSongByCount, getMostListenedArtistByCount } from "./common.mjs";

const selectUser = document.getElementById("user-select");
const results = document.getElementById("user-info");

window.onload = function () {
  const userIds = getUserIDs();

  for (const userId of userIds) {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = "User " + userId;
    selectUser.appendChild(option);
  }
};

selectUser.addEventListener("change", function () {
  const selectedUserId = selectUser.value;
  results.innerHTML = "";

  if (selectedUserId === "") {
    return;
  }

  const listenEvents = getListenEvents(selectedUserId);

  if (listenEvents.length === 0) {
    results.textContent = "This user didn't listen to any songs.";
    return;
  }

  const topSong = getMostListenedSongByCount(listenEvents);
  const topArtist = getMostListenedArtistByCount(listenEvents);

  const songParagraph = document.createElement("p");
  songParagraph.textContent =
    "Most listened song: " + topSong.artist + " - " + topSong.title;

  const artistParagraph = document.createElement("p");
  artistParagraph.textContent =
    "Most listened artist: " + topArtist;

  results.appendChild(songParagraph);
  results.appendChild(artistParagraph);
});
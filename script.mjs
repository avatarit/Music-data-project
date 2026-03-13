import { getUserIDs, getListenEvents } from "./data.mjs";
import {getMostListenedSongByCount, getMostListenedArtistByCount, getMostListenedSongOnFriday, getMostListenedSongByTime, getMostListenedSongOnFridayByTime, getMostListenedArtistByTime } from "./common.mjs";

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
  const topFridaySong = getMostListenedSongOnFriday(listenEvents);
  const topSongByTime = getMostListenedSongByTime(listenEvents);
  const topArtistByTime = getMostListenedArtistByTime(listenEvents);
  const topFridaySongByTime = getMostListenedSongOnFridayByTime(listenEvents);

  const songParagraph = document.createElement("p");
  songParagraph.textContent =
    "Most listened song: " + topSong.artist + " - " + topSong.title;

  const artistParagraph = document.createElement("p");
  artistParagraph.textContent =
    "Most listened artist: " + topArtist;

    const fridaySongParagraph = document.createElement("p");
    if (topFridaySong) {
      fridaySongParagraph.textContent =
        "Most listened song on FridayBetween 4:00AM and 5:00PM: " + topFridaySong.artist + " - " + topFridaySong.title;
    } else {
      fridaySongParagraph.textContent =
        "No songs listened to on Friday Between 4:00AM and 5:00PM.";
    } 

    const songByTimeParagraph = document.createElement("p");
    songByTimeParagraph.textContent =   
    "Most listened song by time: " + topSongByTime.artist + " - " + topSongByTime.title;

    const artistByTimeParagraph = document.createElement("p");
    artistByTimeParagraph.textContent =   
    "Most listened artist by time: " + topArtistByTime;
    
    const fridaySongByTimeParagraph = document.createElement("p");
    if (topFridaySongByTime) {
      fridaySongByTimeParagraph.textContent =
        "Most listened song on Friday by time: " + topFridaySongByTime.artist + " - " + topFridaySongByTime.title;
    } else {
      fridaySongByTimeParagraph.textContent =
        "No songs listened to on Friday by time.";
    } 



    
  results.appendChild(songParagraph);
  results.appendChild(artistParagraph);
  results.appendChild(fridaySongParagraph);

  results.appendChild(songByTimeParagraph);
  results.appendChild(artistByTimeParagraph);
  results.appendChild(fridaySongByTimeParagraph);
});
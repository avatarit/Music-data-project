import { getUserIDs, getListenEvents } from "./data.mjs";
import {
  getMostListenedSongByCount,
  getMostListenedArtistByCount,
  getMostListenedSongOnFriday,
  getMostListenedSongByTime,
  getMostListenedSongOnFridayByTime,
  getMostListenedArtistByTime,
  getMostListenedSongByTimeInRawData,
  getSongsEveryDay,
  getTopGenres
} from "./common.mjs";

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
    const message = document.createElement("p");
    message.textContent = "This user didn't listen to any songs.";
    results.appendChild(message);
    return;
  }

  const topSong = getMostListenedSongByCount(listenEvents);
  const topArtist = getMostListenedArtistByCount(listenEvents);
  const topFridaySong = getMostListenedSongOnFriday(listenEvents);
  const topSongByTime = getMostListenedSongByTime(listenEvents);
  const topArtistByTime = getMostListenedArtistByTime(listenEvents);
  const topFridaySongByTime = getMostListenedSongOnFridayByTime(listenEvents);
  const topSongByTimeInRawData = getMostListenedSongByTimeInRawData(listenEvents);
  const songsEveryDay = getSongsEveryDay(listenEvents);
  const topGenres = getTopGenres(listenEvents);

  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = "Listening summary";

  const list = document.createElement("ul");

  const songItem = document.createElement("li");
  songItem.textContent =
    "Most listened song: " + topSong.artist + " - " + topSong.title;
  list.appendChild(songItem);

  const artistItem = document.createElement("li");
  artistItem.textContent =
    "Most listened artist: " + topArtist;
  list.appendChild(artistItem);

  if (topFridaySong) {
    const fridaySongItem = document.createElement("li");
    fridaySongItem.textContent =
      "Most listened song on Friday night: " +
      topFridaySong.artist +
      " - " +
      topFridaySong.title;
    list.appendChild(fridaySongItem);
  }

  const songByTimeItem = document.createElement("li");
  songByTimeItem.textContent =
    "Most listened song by time: " +
    topSongByTime.artist +
    " - " +
    topSongByTime.title;
  list.appendChild(songByTimeItem);

  const artistByTimeItem = document.createElement("li");
  artistByTimeItem.textContent =
    "Most listened artist by time: " + topArtistByTime;
  list.appendChild(artistByTimeItem);

  if (topFridaySongByTime) {
    const fridaySongByTimeItem = document.createElement("li");
    fridaySongByTimeItem.textContent =
      "Most listened song on Friday night by time: " +
      topFridaySongByTime.artist +
      " - " +
      topFridaySongByTime.title;
    list.appendChild(fridaySongByTimeItem);
  }

  if (topSongByTimeInRawData) {
    const streakItem = document.createElement("li");
    streakItem.textContent =
      "Longest streak: " +
      topSongByTimeInRawData.song.artist +
      " - " +
      topSongByTimeInRawData.song.title +
      " (length: " +
      topSongByTimeInRawData.count +
      ")";
    list.appendChild(streakItem);
  }

  if (songsEveryDay.length > 0) {
    const everyDayItem = document.createElement("li");
    everyDayItem.textContent =
      "Songs listened to every day: " +
      songsEveryDay
        .map(function (song) {
          return song.artist + " - " + song.title;
        })
        .join(", ");
    list.appendChild(everyDayItem);
  }

  if (topGenres.length === 1) {
    const genreItem = document.createElement("li");
    genreItem.textContent = "Top genre: " + topGenres.join(", ");
    list.appendChild(genreItem);
  } else if (topGenres.length === 2) {
    const genreItem = document.createElement("li");
    genreItem.textContent = "Top 2 genres: " + topGenres.join(", ");
    list.appendChild(genreItem);
  } else if (topGenres.length === 3) {
    const genreItem = document.createElement("li");
    genreItem.textContent = "Top genres: " + topGenres.join(", ");
    list.appendChild(genreItem);
  }

  section.appendChild(heading);
  section.appendChild(list);
  results.appendChild(section);
});

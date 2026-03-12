import { getSong, getListenEvents } from "./data.mjs";

const listenEvents = getListenEvents();
export function getMostListenedSongByCount(listenEvents) {
  const songCounts = {};

  for (const event of listenEvents) {
    const songId = event.song_id;

    if (!songCounts[songId]) {
      songCounts[songId] = 1;
    } else {
      songCounts[songId] = songCounts[songId] + 1;
    }
  }

  let mostPlayedSongId = null;
  let highestCount = 0;

  for (const songId in songCounts) {
    if (songCounts[songId] > highestCount) {
      highestCount = songCounts[songId];
      mostPlayedSongId = songId;
    }
  }

  if (mostPlayedSongId === null) {
    return null;
  }

  return getSong(mostPlayedSongId);
}

export function getMostListenedArtistByCount(listenEvents) {
  const artistCounts = {};

  for (const event of listenEvents) {
    const song = getSong(event.song_id);
    const artist = song.artist;

    if (!artistCounts[artist]) {
      artistCounts[artist] = 1;
    } else {
      artistCounts[artist] = artistCounts[artist] + 1;
    }
  }

  let topArtist = null;
  let highestCount = 0;

  for (const artist in artistCounts) {
    if (artistCounts[artist] > highestCount) {
      highestCount = artistCounts[artist];
      topArtist = artist;
    }
  }

  return topArtist;
}
    //between 5PM and 4:00 AM on Friday, which means that the day of week is 5 (Friday) and the time is between 17:00 and 4:00

export function getMostListenedSongOnFriday(listenEvents) {
  const fridaySongCounts = {};

  for (const event of listenEvents) {
    const timestamp = new Date(event.timestamp);
    const dayOfWeek = timestamp.getUTCDay();
    const hour = timestamp.getUTCHours();

    if (dayOfWeek === 5 && (hour >= 17 || hour < 4)) {
      const songId = event.song_id;

      if (!fridaySongCounts[songId]) {
        fridaySongCounts[songId] = 1;
      } else {
        fridaySongCounts[songId] = fridaySongCounts[songId] + 1;
      }
    }
  }

  let mostPlayedSongId = null;
  let highestCount = 0;

  for (const songId in fridaySongCounts) {
    if (fridaySongCounts[songId] > highestCount) {
      highestCount = fridaySongCounts[songId];
      mostPlayedSongId = songId;
    }
  }

  if (mostPlayedSongId === null) {
    return null;
  }

  return getSong(mostPlayedSongId);
} 


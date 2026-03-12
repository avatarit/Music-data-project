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
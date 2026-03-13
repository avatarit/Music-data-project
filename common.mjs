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

// Friday 5:00 PM until Saturday 4:00 AM
export function getMostListenedSongOnFriday(listenEvents) {
  const fridaySongCounts = {};

  for (const event of listenEvents) {
    const timestamp = new Date(event.timestamp);
    const dayOfWeek = timestamp.getUTCDay();
    const hour = timestamp.getUTCHours();

    if ((dayOfWeek === 5 && hour >= 17) || (dayOfWeek === 6 && hour < 4)) {
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

export function getMostListenedSongByTime(listenEvents) {
  const songTimes = {};

  for (const event of listenEvents) {
    const songId = event.song_id;
    const song = getSong(songId);

    if (!songTimes[songId]) {
      songTimes[songId] = song.duration_seconds;
    } else {
      songTimes[songId] = songTimes[songId] + song.duration_seconds;
    }
  }

  let topSongId = null;
  let highestTime = 0;

  for (const songId in songTimes) {
    if (songTimes[songId] > highestTime) {
      highestTime = songTimes[songId];
      topSongId = songId;
    }
  }

  if (topSongId === null) {
    return null;
  }

  return getSong(topSongId);
}

export function getMostListenedArtistByTime(listenEvents) {
  const artistTimes = {};

  for (const event of listenEvents) {
    const song = getSong(event.song_id);
    const artist = song.artist;

    if (!artistTimes[artist]) {
      artistTimes[artist] = song.duration_seconds;
    } else {
      artistTimes[artist] = artistTimes[artist] + song.duration_seconds;
    }
  }

  let topArtist = null;
  let highestTime = 0;

  for (const artist in artistTimes) {
    if (artistTimes[artist] > highestTime) {
      highestTime = artistTimes[artist];
      topArtist = artist;
    }
  }

  return topArtist;
}

// Friday 5:00 PM until Saturday 4:00 AM
export function getMostListenedSongOnFridayByTime(listenEvents) {
  const fridaySongTimes = {};

  for (const event of listenEvents) {
    const timestamp = new Date(event.timestamp);
    const dayOfWeek = timestamp.getUTCDay();
    const hour = timestamp.getUTCHours();
    const song = getSong(event.song_id);

    if ((dayOfWeek === 5 && hour >= 17) || (dayOfWeek === 6 && hour < 4)) {
      const songId = event.song_id;

      if (!fridaySongTimes[songId]) {
        fridaySongTimes[songId] = song.duration_seconds;
      } else {
        fridaySongTimes[songId] =
          fridaySongTimes[songId] + song.duration_seconds;
      }
    }
  }

  let mostPlayedSongId = null;
  let highestTime = 0;

  for (const songId in fridaySongTimes) {
    if (fridaySongTimes[songId] > highestTime) {
      highestTime = fridaySongTimes[songId];
      mostPlayedSongId = songId;
    }
  }

  if (mostPlayedSongId === null) {
    return null;
  }

  return getSong(mostPlayedSongId);
}
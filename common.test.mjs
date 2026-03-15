import assert from "node:assert";
import test from "node:test";
import { getMostListenedSongByTimeInRawData } from "./common.mjs";

const listenEvents = [
  { song_id: "song-1" },
  { song_id: "song-1" },
  { song_id: "song-2" },
  { song_id: "song-3" },
  { song_id: "song-3" },
  { song_id: "song-3" }
];

test("getMostListenedSongByTimeInRawData returns the correct streak", () => {

  const result = getMostListenedSongByTimeInRawData(listenEvents);

  assert.equal(result.count, 3);
  assert.equal(result.song.id, "song-3");

});

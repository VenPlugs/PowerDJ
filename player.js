const { readFile } = require("fs").promises;

const { getAudios, mimeTypes } = require("./util");

const player = {
  queue: [],
  cursor: 0,
  audio: new Audio(),

  getCurrentSong() {
    return player.queue[player.cursor] ?? null;
  },

  async toUrl(file /* string */) {
    const extIdx = file.lastIndexOf(".") + 1;
    if (!extIdx) throw "File missing extension";
    const ext = file.slice(extIdx);
    if (!mimeTypes.hasOwnProperty(ext)) throw `Unsupported format .${ext}`;

    const data = await readFile(file, "base64");
    return `data:${mimeTypes[ext]};base64,${data}`;
  },

  async play(file /* string | undefined */) {
    if (!file) {
      if (!player.queue.length) throw "The queue is empty and no file was specified";
      file = player.queue[0];
    }
    player.audio.src = await player.toUrl(file ?? queue[0]);
    player.audio.currentTime = 0;
    await player.audio.play();
  },

  async enqueueFolder(folder /* string */) {
    player.queue = player.queue.concat(await getAudios(folder));
  },

  async enqueue(file /* string */) {
    player.queue.push(await player.toUrl(file));
  },

  async next() {
    if (player.queue.length - 1 <= player.cursor) return false;
    await player.play(player.queue[++player.cursor]);
    return true;
  },

  async prev() {
    if (player.cursor === 0) return false;
    await player.play(player.queue[--player.cursor]);
    return true;
  }
};

player.audio.addEventListener("ended", () => player.next());

module.exports = player;

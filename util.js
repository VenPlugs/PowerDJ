const { readdir, stat } = require("fs").promises;
const { join } = require("path");

// https://www.iana.org/assignments/media-types/media-types.xhtml#audio
const mimeTypes = {
  aac: "audio/acc",
  flac: "audio/flac",
  mp3: "audio/mp3",
  m4a: "audio/mpeg",
  ogg: "audio/ogg",
  opus: "audio/opus",
  vorbis: "audio/vorbis",
  wav: "audio/wav"
};

async function getAudios(dir /* string */) {
  const files = (await readdir(dir)).map(async child => {
    const path = join(dir, child);
    const stats = await stat(path);
    if (stats.isDirectory()) return getAudios(path);
    else {
      const ext = getExt(path);
      if (!ext || !mimeTypes.hasOwnProperty(ext)) return void 0;
      return path;
    }
  });
  return Promise.all(files).then(f => f.flat().filter(Boolean));
}

function getExt(fp /* string */) {
  const extIdx = fp.lastIndexOf(".") + 1;
  if (!extIdx) return null;
  return fp.slice(extIdx);
}

module.exports = {
  getExt,
  getAudios,
  mimeTypes
};

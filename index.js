const nodeshout = require("nodeshout-napi");
const { FileReadStream, ShoutStream } = require("nodeshout-napi");
const play = require("./shoutPlay");
// Initalize
nodeshout.init();

// Create a shout instance
const shout = nodeshout.create();

// Configure it
shout.setHost("167.99.53.97");
shout.setPort(8000);
shout.setUser("source");
shout.setPassword("hackme");
shout.setMount("cp");
shout.setFormat(1); // 0=ogg, 1=mp3
shout.setAudioInfo("bitrate", "192");
shout.setAudioInfo("samplerate", "44100");
shout.setAudioInfo("channels", "2");

shout.open();

// Create a metadata instance
const metadata = nodeshout.createMetadata();

// Set currently playing song.
metadata.add("song", "Led Zeppelin - I can't quit you baby");

// Apply metadata to shout
shout.setMetadata(metadata);
const playSong = (song) => {
  return play(shout, song);
};

let songs = ["./song2.mp3", "./Summer.mp3", "./song3.mp3"];

const finishSong = (index) => {
  if (index < songs.length) {
    return playSong(songs[index]).on("finish", () => {
      finishSong(index + 1);
    });
  }
};

finishSong(0);

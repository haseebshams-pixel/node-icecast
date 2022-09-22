const nodeshout = require("nodeshout-napi");
const { FileReadStream, ShoutStream } = require("nodeshout-napi");

// Initalize
nodeshout.init();

// Create a shout instance
const shout = nodeshout.create();

// Configure it
shout.setHost("167.99.53.97");
shout.setPort(8000);
shout.setUser("source");
shout.setPassword("hackme");
shout.setMount("mount");
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

var fileStream = new FileReadStream("./Summer.mp3", 65536);
var shoutStream = fileStream.pipe(new ShoutStream(shout));

shoutStream.on("finish", () => {
  console.log("finished song");
});

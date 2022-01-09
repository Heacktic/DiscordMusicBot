const ytdl = require('ytdl-core');
const discordVoice = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const fs = require('File-System');
const { createWriteStream } = require('File-System');


module.exports = {
  name: 'queuehandler',
  description: 'handles the queing of songs',

  async execute() {

    if (global.queuestring[0] != undefined && global.queue[10] == undefined) {
      let queuestring = global.queuestring[0];
      global.queuestring.shift();

      switch (true) {

        //Handels cases where a youtube link is provided
        case ytdl.validateURL(queuestring):

          const options = {
            quality: 'highestaudio',
            filter: 'audioonly',
            highWaterMark: 1024 * 1024 * 10
          }
          const id = ytdl.getURLVideoID(queuestring);
          ytdl.getInfo(id).then(info => {
            console.log("valid youtube link found, retriving data...");
            ytdl.downloadFromInfo(info, options)
              .pipe(createWriteStream(`songtempcache/${id}.mp4`))
              .on('finish', function () {
                console.log('song downloaded, pushing path to queueresoures');
                let path = `C:/Users/mitch/Desktop/Coding/Projects/DiscordBot/songtempcache/${id}.mp4`;
                global.queue.push([path, info.videoDetails.title, info.videoDetails.author.name, info.thumbnail_url]);
              });
          });

          break;

        default:

          //handles cases where no link is provided

          //not finnished

          break;

      }
      QueueEvents.emit('update');
    }
  }
}
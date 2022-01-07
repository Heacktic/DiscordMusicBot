const discordVoice = require('@discordjs/voice');
const { createReadStream } = require('fs');
const { createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');


module.exports = {
  name: 'songplayer',
  description: 'handles the playing of songs',

  async execute() {
    //que is not empty and the bot is not already playing
    if (global.queue[0] != undefined && global.player.state.status=='idle' ) {
      console.log("Playing song");
      global.datastream = createReadStream(global.queue[0][0]);
      let resource = createAudioResource(datastream, {
        inputType: StreamType.Arbitrary,
      });

      global.dispatcher = global.player.play(resource);
      QueueEvents.emit('update');
    }
  }
} 
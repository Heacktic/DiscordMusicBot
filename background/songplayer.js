const discordVoice = require('@discordjs/voice');
const { createAudioResource, AudioPlayerStatus, AudioPlayerIdleState } = require('@discordjs/voice');
const ytdl = require('ytdl-core');


module.exports = {
  name: 'songplayer',
  description: 'handles the playing of songs',

  async execute() {
    //que is not empty and the bot is not already playing
    if (global.queue[0] != undefined && global.player.state.status=='idle' ) {
      console.log("Playing song");
      global.dispatcher = global.player.play(createAudioResource(global.queue[0][0]));
      QueueEvents.emit('update');
    }
  }
} 
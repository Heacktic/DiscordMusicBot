const discordVoice = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: "joins channel",
    execute(member){
        if(member.voice.channel==null) return;
            global.connection = discordVoice.joinVoiceChannel({
            channelId: member.voice.channel.id,
            guildId: member.guild.id,
            adapterCreator: member.guild.voiceAdapterCreator,
          }); 
          global.connection.subscribe(global.player);      
     return global.connection;
    }
}
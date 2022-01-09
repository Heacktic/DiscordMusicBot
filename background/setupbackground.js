const login = require('../login.json');
const { AudioPlayerStatus } = require('@discordjs/voice');
module.exports = {
    name: 'setupbackground',
    description: 'sets up the panel',
    async execute(client, QueueEvents) {
        
        //runs songplayer and queuehandler background stuff ever secound
        function runbackground() {
            client.commands.get('queuehandler').execute();
            client.commands.get('songplayer').execute();
        }
        setInterval(runbackground, 1000);

        global.player.on(AudioPlayerStatus.Idle, () => {
            global.queue.shift();
            QueueEvents.emit('update');
        });

        //get the control panel channel
        const channel = client.guilds.cache.get(login.guild).channels.cache.get(login.panelchannel);

        //clear the panel channel
        let fetched;
        console.log('clearing chanel...');
        fetched = await channel.messages.fetch({ limit: 99 });
        channel.bulkDelete(fetched);
        console.log('channel cleared')

        client.commands.get('controlpanel').execute(channel);
        client.commands.get('queuepanel').execute(QueueEvents, channel);
        client.commands.get('buttoninteractions').execute(client);
    }
}
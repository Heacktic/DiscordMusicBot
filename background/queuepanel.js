const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { } = require('discord.js');
const login = require('../login.json');

module.exports = {
    name: 'queuepanel',
    description: "interactive queue",
    async execute(client,QueueEvents) {

        const channel =
            client.guilds.cache.get(login.guild)
                .channels.cache.get(login.channel);

        let message = await channel.send("Queue :");
        //current track skip button
        const currentskip = new MessageButton()
            .setCustomId('queuelistleftid')
            .setLabel('Skip')
            .setStyle('DANGER');
        //pageing system buttons
        const queuelistleft = new MessageButton()
            .setCustomId('queuelistleftid')
            .setLabel('<<<')
            .setStyle('SECONDARY');
        const queuelistright = new MessageButton()
            .setCustomId('queuelistrightid')
            .setLabel('>>>')
            .setStyle('SECONDARY');
        let content = '';


        //Queue mangment buttons

        const PushDown1 = new MessageButton()
            .setCustomId('pushdown1id')
            .setLabel('vvv')
            .setStyle('SECONDARY');
        const PushUp1 = new MessageButton()
            .setCustomId('pushup1id')
            .setLabel('^^^')
            .setStyle('SECONDARY');
        const Skip1 = new MessageButton()
            .setCustomId('Skip1id')
            .setLabel('vvv')
            .setStyle('SECONDARY');
        QueueEvents.on('update', () => {
            if (global.queue[0] === undefined) return;
            let playing = global.queue[0][1] + ' by :' + global.queue[0][2];
            let queuecontent = '';
            for (let i = 1; i <= 11; i++) {
                if (global.queue[i] == undefined) break;
                queuecontent = queuecontent + "Song : " + queue[i][1] + " By : " + queue[i][2] + '\n';
            }
            message.edit(
                'Currently Playing :' + '\n' + playing + '\n' +
                'Queue :' + '\n' + queuecontent + '\n' +
                'buttons go here');
        });
    }
}
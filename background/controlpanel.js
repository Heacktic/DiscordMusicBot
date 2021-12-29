const { MessageActionRow, MessageButton } = require('discord.js');
const login = require('../login.json');


module.exports = {
    name: 'controlpanel',
    description: "allows easy acess to music bot commands",
    async execute(client) {

        const channel =
            client.guilds.cache.get(login.guild)
                .channels.cache.get(login.channel);

        //clear channel--------------------------------------------------------------------------------------------

        async function clear() {
            //const fetched = await channel.messages.fetch({limit: 1});
            let fetched;
            fetched = await channel.messages.fetch({ limit: 99 });
            channel.bulkDelete(fetched);
            console.log('clearing chanel...');
        }
        clear();

        //create control panel -------------------------------------------------------------------------------------

        //create buttons

        //music control panel buttons
        const joinbutton = new MessageButton()
            .setCustomId('joinbuttonid')
            .setLabel('Join')
            .setStyle('SUCCESS');
        const leavebutton = new MessageButton()
            .setCustomId('leavebuttonid')
            .setLabel('Leave')
            .setStyle('DANGER');
        const pausebutton = new MessageButton()
            .setCustomId('pausebuttonid')
            .setLabel('Pause')
            .setStyle('SECONDARY');
        const resumebutton = new MessageButton()
            .setCustomId('resumebuttonid')
            .setLabel('Resume')
            .setStyle('SECONDARY');
        const skipbutton = new MessageButton()
            .setCustomId('skipbuttonid')
            .setLabel('Skip')
            .setStyle('DANGER');


        const MusicControlPanel = new MessageActionRow()
            .addComponents(
                joinbutton,
                leavebutton,
                pausebutton,
                resumebutton,
                skipbutton
            )

        channel.send({ content: 'Music Commands :', components: [MusicControlPanel] });

        //button intercation array

        client.on('interactionCreate', interaction => {
            if (!interaction.isButton()) return;
            switch (interaction.customId) {
                case 'joinbuttonid':
                    client.commands.get('join').execute(interaction.member);
                    break;
                case 'leavebuttonid':
                    client.commands.get('leave').execute();
                    break;
                case 'pausebuttonid':
                    client.commands.get('pause').execute();
                    break;
                case 'resumebuttonid':
                    client.commands.get('resume').execute();
                    break;
                case 'skipbuttonid':
                    client.commands.get('skip').execute();
                    break;
                case 'skipbuttonid':
                    client.commands.get('skip').execute();
                    break;
            }
            interaction.deferUpdate();
        });
    }
}


        
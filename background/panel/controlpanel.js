const { MessageActionRow, MessageButton } = require('discord.js');
const login = require('../../login.json');


module.exports = {
    name: 'controlpanel',
    description: "allows easy acess to music bot commands via a row of buttons",
    async execute(channel) {

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

    }
}



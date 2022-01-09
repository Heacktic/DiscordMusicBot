module.exports = {
    name: 'buttoninteractions',
    description: "Handels Button interactions",
    async execute(client) {
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
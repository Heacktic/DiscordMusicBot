module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute() {
        global.connection.disconnect();
    }
}
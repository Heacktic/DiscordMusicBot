module.exports = {
    name: 'echo',
    description: "echos",
    execute(message, args){
        message.channel.send(args);
    }
}
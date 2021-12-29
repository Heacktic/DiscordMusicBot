module.exports = {
    name: 'play',
    description: 'adds a video to the que to the back of the que',
    
    async execute(message, args){
        global.queuestring.push(args);
        } }
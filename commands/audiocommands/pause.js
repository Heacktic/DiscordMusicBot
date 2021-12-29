module.exports = {
    name: 'pause',
    description: 'adds a video to the que to the back of the que',
    
    async execute(){
        global.player.pause();
        } }
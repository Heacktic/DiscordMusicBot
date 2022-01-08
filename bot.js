const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const discordVoice = require('@discordjs/voice');
const { AudioPlayerStatus } = require('@discordjs/voice');

const fs = require('fs');
const events = require('events');
const id = require('./login.json').id;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
});

//Varibles and  Modules -----------------------------------------------------------------------------------------------

//global varible declaring
global.queuestring = [];
global.queue = [];
global.player = discordVoice.createAudioPlayer();

//varible declaring
QueueEvents = new events.EventEmitter();

//command prefix
const prefix = '%';

//allow acess to commands and background files
client.commands = new Discord.Collection();
function GetModuleFiles(path) {
  console.log('getting ' + path + ' files...');
  const commandFiles = fs.readdirSync(`./${path}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./${path}/${file}`);
    client.commands.set(command.name, command);
  }
  console.log('files recived');
}
//get Required Modules
GetModuleFiles('commands/audiocommands');
GetModuleFiles('commands/archivecommands');
GetModuleFiles('background');

//Command Processor --------------------------------------------------------------------------------------------------------------------------------

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  args = args.pop();
  console.log(`Message from ${message.author.username}: ${message.content}`);

  switch (command) {
    case 'ping':   client.commands.get('ping').execute(message);        break ;
    case 'play':   client.commands.get('play').execute(message, args);  break ;
    case 'leave':  client.commands.get('leave').execute();              break ;
    case 'join':   client.commands.get('join').execute(message.member); break ;
    case 'echo':   client.commands.get('echo').execute(message, args);  break ;
    case 'test':   client.commands.get('test').execute(message, args);  break ;
    case 'pause':  client.commands.get('pause').execute();              break ;
    case 'resume': client.commands.get('resume').execute();             break ;
    case 'skip':   client.commands.get('skip').execute();               break ;
  }
});
//constant backround stuff
function runbackground() {
  client.commands.get('queuehandler').execute();
  client.commands.get('songplayer').execute();
}
setInterval(runbackground, 1000);

client.once('ready', () => {
  console.log('Running');
  client.commands.get('controlpanel').execute(client);
  client.commands.get('queuepanel').execute(client, QueueEvents);
  //client.commands.get('archive').execute(client);
  //client.commands.get('print').execute(client);
  global.player.on(AudioPlayerStatus.Idle, () => {
  global.queue.shift();
    QueueEvents.emit('update');
  });
  //very important
  /*
    global.queuestring.push("https://www.youtube.com/watch?v=7nQ2oiVqKHw");
    global.queuestring.push("https://www.youtube.com/watch?v=829pvBHyG6I");
    global.queuestring.push('https://www.youtube.com/watch?v=czhd1eHv6ac');
    global.queuestring.push('https://www.youtube.com/watch?v=vDX_xlZoFwY');
    global.queuestring.push('https://www.youtube.com/watch?v=JVFHWJdEc3k');
    global.queuestring.push('https://www.youtube.com/watch?v=9DKwJ-yxQpQ');
    
  */
    global.queuestring.push('https://www.youtube.com/watch?v=9EQcFrYzX2U');
});

client.login(id);
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const discordVoice = require('@discordjs/voice');

const fs = require('fs');
const events = require('events');
const login = require('./login.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
});

//Varibles and  Modules -----------------------------------------------------------------------------------------------

//varible declaring
global.queuestring = [];
global.queue = [];
global.player = discordVoice.createAudioPlayer();
QueueEvents = new events.EventEmitter();

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
GetModuleFiles('background/panel');
GetModuleFiles('background/player');
GetModuleFiles('background/queuer');
GetModuleFiles('background');
//GetModuleFiles('commands/archivecommands');


//Command Processor --------------------------------------------------------------------------------------------------------------------------------

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(login.Prefix) || message.author.bot) return;

  let args = message.content.slice(login.Prefix.length).split(/ +/);
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
client.once('ready', () => {
  client.commands.get('setupbackground').execute(client, QueueEvents);
});


client.login(login.id);
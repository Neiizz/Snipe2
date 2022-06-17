  const Discord = require('discord.js'),
      client = new Discord.Client(),
      moment = require("moment-timezone"),
      fetch = require('node-fetch');
      config = require('./config.json')
      cfonts = require('cfonts')

      console.clear()
      cfonts.say('VANITY.SNPR', {
          font: 'chrome',              
          align: 'left',              
          colors: ['system', 'magenta'],         
          background: 'transparent',  
          letterSpacing: 1,           
          lineHeight: 1,              
          space: true,                
          maxLength: '0',             
          gradient: false,            
          independentGradient: false, 
          transitionGradient: false,  
          env: 'node'              
      })
      console.log('Chargement, Veuillez patienter...')

class Main {
    constructor() {
        this.sniperInterval;
    }

    async setVanityURL(url, guild) {
        const time = moment.tz(Date.now(), "Europe/Paris").format("HH:mm:ss");
        console.log(`[${time}] [INFO] Snipe discord.gg/${url}`);
        return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": "Bot " + client.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": JSON.stringify({
                "code": url
            }),
            "method": "PATCH",
            "mode": "cors"
        });
    }
    async checkVanityURL(url) {
        return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": "Bot " + client.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "method": "GET",
            "mode": "cors"
        });
    }

    async startSnipe(url, guild) {
        this.sniperInterval = setInterval(async () => {
            await this.setVanityURL(url, guild);
        }, 1000);
    }

    stopSnipe() {
        return clearInterval(this.sniperInterval);
    }
}
const prefix = config.prefix;

let handler = new Main();

client.on('message', async (message) => {
    let messageArray = message.content.split(" "),
        args = messageArray.slice(1);
    const args1 = message.content.slice(prefix.length).split(/ +/),
          command = args1.shift().toLowerCase();

    if (command === "snipe") {
        let url = args[0];
        

        if (!message.guild.features.includes('VANITY_URL')) {
            return message.reply("Vous devez fournir l’argument VANITY_URL");
        };

        message.reply(`L’url de vanity ${url} est en train d’être snipe! {Cela peut prendre un certain temps!}`);
        console.log(`[INFO] Début du sniping de l’url ${url} !`);
        await handler.startSnipe(url, message.guild);
    };

    if (command === "ssnipe") {
        handler.stopSnipe();
        message.react('❌')
    };
    

});

client.on('ready', () => {
    console.clear()
    console.clear()
    cfonts.say('VANITY.SNPR', {
        font: 'chrome',              
        align: 'left',              
        colors: ['system', 'magenta'],         
        background: 'transparent',  
        letterSpacing: 1,           
        lineHeight: 1,              
        space: true,                
        maxLength: '0',             
        gradient: false,            
        independentGradient: false, 
        transitionGradient: false,  
        env: 'node'              
    })
    console.log(`Connecté en tant que ${client.user.tag} Prêt a Snipe des url`)
})
client.login(config.token).catch(err => {
    if(err) return console.log('Le jeton fourni n’est pas valide Veuillez créer un nouveau jeton à https://discord.com/developers/applications')
})

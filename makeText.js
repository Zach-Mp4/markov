/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require('./markov');
const axios = require('axios');
const fs = require('fs');
const args = process.argv.slice(2);

if (args[0] === 'file'){
    let path = args[1];
    try{
        const data = fs.readFileSync(path, 'utf8');
        let machine = new MarkovMachine(data);
        console.log(`generated text from file ${path}: ${machine.makeText()}`);
    }
    catch (error){
        console.error('Error reading file', error);
        process.exit(1);
    }
}
else if (args[0] === 'url'){
    fromUrl();
}

async function fromUrl(){
    let url = args[1];
    try{
        let data = await axios.get(url);
        data = data.data;
        let machine = new MarkovMachine(data);
        console.log(`generated text from url ${url}: ${machine.makeText()}`);
    }
    catch (error){
        console.error('Error reading url', error);
        process.exit(1);
    }
}


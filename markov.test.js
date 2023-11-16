const {MarkovMachine} = require('./markov');

describe('test MarkovMachine class', function (){
    let testMachine = new MarkovMachine("the cat in the hat");
    

    test('test makeChain', function (){
        let outcome = false;
        for (let [index, word] of testMachine.words.entries()){
            if (testMachine.chain[word].includes(testMachine.words[index + 1])){
                outcome = true
            }
            else{
                outcome = false;
            }
        }
        expect(outcome).toBeTruthy();
    });

    test('test makeText', function (){
        let outcome = false;
        let text = testMachine.makeText();
        let words = text.split(/[ \r\n]+/);
        words = words.filter(c => c !== "");
        for (let [index, word] of words.entries()){
            if (testMachine.chain[word].includes(words[index + 1])){
                outcome = true;
            }
            else{
                outcome = false;
            }
        }
        expect(outcome).toBeTruthy();
    })
});
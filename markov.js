/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {};
    let setWords = new Set(this.words);
    //set up chain dict
    for (let word of setWords){
      chain[word] = [];
    }
    //populate chain dict
    for (let uniqueWord of setWords){
      for (let i = 0; i < this.words.length; i++){
        let word = this.words[i];
        if (word == uniqueWord){
          chain[word].push(this.words[i + 1]);
        }
      }
    }
    return chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let randomWord = this.words[Math.floor(Math.random() * this.words.length)];
    let text = "";
    let curWord = randomWord;
    for (let i = 0; i < numWords; i++){
      let curWordArr = this.chain[curWord];
      let wordAdded = curWordArr[Math.floor(Math.random() * curWordArr.length)];
      if (!wordAdded) break;
      if (text.length === 0){
        text = wordAdded;
      }
      else{
        text = text + " " + wordAdded;
      }
      curWord = wordAdded;
    }
    return text;
  }
}

module.exports = {MarkovMachine};

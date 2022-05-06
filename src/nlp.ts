import { WordTokenizer, SentimentAnalyzer, PorterStemmer } from "natural";
//@ts-ignore
import aposToLexForm from "apos-to-lex-form";
import stopword, { removeStopwords } from "stopword";

const tokenizer = new WordTokenizer();
var SpellCorrector = require('spelling-corrector');
var spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");

export function getSentiment(str: string): -1 | 0 | 1 {
  if (!str.trim()) {
    return 0;
  }

  const lexed = aposToLexForm(str)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, "");

  const tokenized = tokenizer.tokenize(lexed);

  const fixedSpelling = tokenized.map((word) => spellCorrector.correct(word));

  const stopWordsRemoved = removeStopwords(fixedSpelling);

  const analyzed = analyzer.getSentiment(stopWordsRemoved);

  if (analyzed >= 1) return 1; // positive
  if (analyzed === 0) return 0;
  return -1;
}

// const tokenizer = new WordTokenizer();
// var SpellCorrector = require('spelling-corrector');
// var spellCorrector = new SpellCorrector();
// spellCorrector.loadDictionary();

// const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')

// export function getSentiment(str: string){
// 	if(!str.trim()){
// 		return 0;
// 	}

// const lexed = aposToLexForm(str).toLowerCase().replace(/[^a-zA-Z\s]+/g, "");
// const tokenized = tokenizer.tokenize(lexed);

//  const { removeStopwords } = require('stopword')
//  const oldString1 = 'good'.split(' ')
//  const newString = removeStopwords(oldString1)

// const analyzed = analyzer.getSentiment(newString)
// 	// console.log("newString: " + newString);
// 	if(analyzed >= 1) return 1 // +
// 	if(analyzed === 0) return 0 // -
// 	return -1

// }

// // console.log(getSentiment('sad'));
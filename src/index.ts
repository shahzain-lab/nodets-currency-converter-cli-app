import { CurrencyModel } from "./converter";

console.log("CURRENCY CONVERTER");


console.log(`_____________\nGet latest currencies updates and exchange rates\n\n_____________`);
const exchangeLab = new CurrencyModel;
exchangeLab.initExchanger();
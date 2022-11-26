#!/usr/bin/env node


import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { CurrencyModel } from "./converter.js";
console.log(chalk.bgGreen(`Get latest currencies updates and exchange rates\n`));
figlet.text('ts exchanger!', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 120,
    whitespaceBreak: true
}, ((err, data) => {
    console.log('\n');
    console.log(gradient.rainbow(data));
    console.log('\n');
    const exchangeLab = new CurrencyModel;
    exchangeLab.initExchanger();
}));

import inquirer from 'inquirer';
import { country_list } from './currency-list.js';
import { Model } from './Model.js';
import chalk from 'chalk';
export class CurrencyModel extends Model {
    constructor() {
        super(...arguments);
        this.from = '';
        this.to = '';
        this.amount = 123;
        this.date = new Date(); // YYYY-MM-DD
    }
    initExchanger() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'amount',
                message: chalk.bgCyan('Please Enter your amount: ')
            }
        ]).then((ans) => {
            this.amount = Number(ans.amount);
            if (!isNaN(this.amount)) {
                console.log('\n');
                this.get_convertFrom();
            }
            else {
                console.log(chalk.yellow('Please enter number'));
                this.initExchanger();
            }
        });
    }
    printReceipt() {
        const date = this.formatDate(this.date);
        console.log(chalk.yellow(`__________\nAmount:  ${chalk.green(this.amount)} ${chalk.green(this.from)}\nfrom:   ${chalk.green(this.from)}\nTo:   ${chalk.green(this.to)}\ndate:  ${chalk.green(date)}`));
        console.log('__________');
        console.log('\n');
    }
    ;
    formatDate(date) {
        const day = ("0" + date.getDate() + 1).slice(-2);
        const month = ("0" + date.getMonth() + 1).slice(-2);
        const year = date.getFullYear();
        // const hour = date.getHours();
        // const minute = date.getMinutes();
        // const second = date.getSeconds();
        return `${day}-${month}-${year}`;
    }
    async confirmation() {
        const promptConfirm = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: chalk.bgCyan('start conversion process ? ')
            }
        ]);
        if (promptConfirm.confirm) {
            const data = {
                amount: this.amount,
                from: this.from,
                to: this.to,
                date: this.formatDate(this.date)
            };
            const results = await this.startConverter(data);
            console.log(chalk.yellow(`__________\nTotal:  ${chalk.green(results.result.toFixed(2))} ${chalk.green(this.to)}\ndate:  ${chalk.green(results.date)}`));
            console.log('__________');
            console.log('\n');
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: chalk.bgCyan('Do you want to play again: ')
                }
            ]).then(({ confirm }) => {
                if (confirm) {
                    this.initExchanger();
                }
            });
        }
        else {
            console.log('\n');
            this.initExchanger();
        }
    }
    get_convertFrom() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'from',
                message: chalk.bgCyan('which currency you want to convert: '),
                choices: country_list.map((c, i) => {
                    const splitCodes = c.split(':');
                    const curreny = splitCodes[0];
                    const country = splitCodes[1];
                    return {
                        key: i,
                        value: c,
                        name: `${i + 1}> ${country} - ${curreny}`
                    };
                })
            }
        ]).then((ans) => {
            const splitCodes = ans.from.split(':');
            const curreny = splitCodes[0];
            // const country = splitCodes[1];
            this.from = curreny;
            this.get_convertTO();
        });
    }
    get_convertTO() {
        console.log('\n');
        inquirer.prompt([
            {
                type: 'list',
                name: 'to',
                message: chalk.bgCyan('currency you want to convert in: '),
                choices: country_list.map((c, i) => {
                    const splitCodes = c.split(':');
                    const curreny = splitCodes[0];
                    const country = splitCodes[1];
                    return {
                        key: i,
                        value: c,
                        name: `${i + 1}> ${country} - ${curreny}`
                    };
                })
            }
        ]).then((ans) => {
            const splitCodes = ans.to.split(':');
            const curreny = splitCodes[0];
            // const country = splitCodes[1];
            this.to = curreny;
            this.printReceipt();
            this.confirmation();
        });
    }
}
;

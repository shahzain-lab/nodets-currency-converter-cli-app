import inquirer from 'inquirer';
import { country_list } from './currency-list';
import { IAPIResponse } from './interfaces';
import { Model } from './Model';


export class CurrencyModel extends Model {
    protected from: string = '';
    protected to: string = '';
    protected amount: number = 123;
    protected date: Date = new Date() // YYYY-MM-DD

    initExchanger(): void {
        inquirer.prompt([
            {
                type: 'input',
                name: 'amount',
                message: 'Please Enter your amount: '
            }
        ]).then((ans) => {
            this.amount = Number(ans.amount);
            if(!isNaN(this.amount)) {
                console.log('\n');
                this.get_convertFrom()
            }else {
                console.log('Please enter number')
                this.initExchanger()
            }
        })
    }

    printReceipt(): void {
        const date = this.formatDate(this.date);
        console.log(`__________\nAmount:  ${this.amount} ${this.from}\nfrom:   ${this.from}\nTo:   ${this.to}\ndate:  ${date}`);
        console.log('__________')
        console.log('\n')
    };

    formatDate(date: Date): string {
        const day = ("0" + date.getDate() + 1).slice(-2);
        const month = ("0" + date.getMonth() + 1).slice(-2);
        const year = date.getFullYear();
        // const hour = date.getHours();
        // const minute = date.getMinutes();
        // const second = date.getSeconds();
        
        return `${day}-${month}-${year}`
    }

    async confirmation(): Promise<void> {
       const promptConfirm = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'start conversion process ? '
            }
        ])
        if(promptConfirm.confirm) {
            const data = {
                amount: this.amount,
                from: this.from,
                to: this.to,
                date: this.formatDate(this.date)
            }
            const results: IAPIResponse = await this.startConverter(data);
            console.log(`__________\nTotal:  ${results.result.toFixed(2)} ${this.to}\ndate:  ${results.date}`);
            console.log('__________')
            console.log('\n');
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: 'Do you want to play again: '
                }
            ]).then(({confirm}) => {
                if(confirm){ this.initExchanger() }
            })
        } else {
            console.log('\n')
            this.initExchanger();
        }   
    }

    get_convertFrom(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'from',
                message: 'which currency you want to convert: ',
                choices: country_list.map((c, i: number) => {
                    const splitCodes = c.split(':');
                    const curreny = splitCodes[0];
                    const country = splitCodes[1];

                    return {
                        key: i,
                        value: c,
                        name: `${i+1}> ${country} - ${curreny}`
                    }
                })
            }
        ]).then((ans: any) => {
            const splitCodes = ans.from.split(':');
            const curreny = splitCodes[0];
            // const country = splitCodes[1];
            this.from = curreny;
            this.get_convertTO()
        })
    }

    get_convertTO(): void {
        console.log('\n');
        inquirer.prompt([
            {
                type: 'list',
                name: 'to',
                message: 'currency you want to convert in: ',
                choices: country_list.map((c, i: number) => {
                    const splitCodes = c.split(':');
                    const curreny = splitCodes[0];
                    const country = splitCodes[1];

                    return {
                        key: i,
                        value: c,
                        name: `${i+1}> ${country} - ${curreny}`
                    }
                })
            }
         ]).then((ans: any) => {
            const splitCodes = ans.to.split(':');
            const curreny = splitCodes[0];
            // const country = splitCodes[1];
            this.to = curreny;
            this.printReceipt();
            this.confirmation()
        })
    }
};

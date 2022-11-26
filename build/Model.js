import fetch from 'node-fetch';
export class Model {
    constructor() {
        this.API_KEY = "mrIxWVFzkZ0MRG1ZeoIKrMS2ULzbYrdm";
        this.API_URL = "https://api.apilayer.com/exchangerates_data";
    }
    async startConverter(data) {
        let response;
        try {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    'apikey': this.API_KEY,
                    Accept: 'application/json',
                }
            };
            const res = await fetch(`${this.API_URL}/convert?to=${data.to}&from=${data.from}&amount=${data.amount}`, requestOptions);
            response = await res.json();
        }
        catch (err) {
            console.log(err);
            response = err;
        }
        return response;
    }
}

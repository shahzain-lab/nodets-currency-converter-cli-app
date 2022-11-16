import fetch from 'node-fetch';
import { IAPIResponse, IRequiredProps } from './interfaces';


export class Model {
    private API_KEY="mrIxWVFzkZ0MRG1ZeoIKrMS2ULzbYrdm";
    private API_URL = "https://api.apilayer.com/exchangerates_data"
    

    async startConverter(data: IRequiredProps): Promise<IAPIResponse> {
        let response;
        try{
        
             const requestOptions = {
              method: 'GET',
              redirect: 'follow' as RequestRedirect,
              headers: {
                'apikey': this.API_KEY,
                Accept: 'application/json',
              }
            };
        
           const res = await fetch(`${this.API_URL}/convert?to=${data.to}&from=${data.from}&amount=${data.amount}`, requestOptions)
           response = await res.json();

        }catch(err) {
            console.log(err);
            response = err
        }

        return response
    }
}
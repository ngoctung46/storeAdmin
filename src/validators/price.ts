import { FormControl } from '@angular/forms';

export class PriceValidator{
    static isValid(control: FormControl):any{
        if(isNaN(control.value)){
            return{
                "not a number": true
            };
        }
        if(control.value < 500){
            return{
                "wrong price": true
            };
        }
        return null;
    }
}
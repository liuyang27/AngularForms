////////////custome validation//////////////
import { AbstractControl, ValidatorFn } from "@angular/forms";

//method 1

// export function forbiddenNameValidator(control: AbstractControl):{[key:string]:any | null} {
//     const forbidden = /admin/.test(control.value);
//     return forbidden ? {'forbiddenName':{value:control.value}} : null;
// }


//method 2

export function forbiddenNameValidator(forbiddenName:RegExp):ValidatorFn {
    return (control: AbstractControl):{[key:string]:any | null} => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? {'forbiddenName':{value:control.value}} : null;
    };
}
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'espar'
})

export class EsParPipe implements PipeTransform{
    transform(value: any) {
        var espar = "No es número par"
        if(value%2 == 0){
            espar = "Es un número par";
        }
        return "Se estreno en: " + value + " y " + espar; 
    }
}


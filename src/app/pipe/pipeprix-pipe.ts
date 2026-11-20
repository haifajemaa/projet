import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeprix',
})
export class PipeprixPipe implements PipeTransform {
  transform(prix: number): string{
    return prix +"DT";
  }
}

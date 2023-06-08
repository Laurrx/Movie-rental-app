import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'myCustomSearch'})
export class MyCustomSearchPipe implements PipeTransform {
  transform(values: Array<any>, searchTerm: string, searchCriterias: Array<string>, filter: string,filterType:string): any {
    return values.filter(item => {
      let found = false;
      searchCriterias.forEach(searchCriteria => {
        if (item[searchCriteria].toLowerCase().includes(searchTerm.toLowerCase())
            && (!filter.toLowerCase() || !filterType || item[filterType].toLowerCase() === filter.toLowerCase())) {
          found = true;
        }
      })
      return found;
    })
  }
}

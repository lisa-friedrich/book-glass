import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookfilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(items: any[], filter: any, defaultFilter: boolean): any {
    console.log(items);
    console.log(filter);
    if (!filter) {
      return items;
    }
    if (!Array.isArray(items)) {
      return items;
    }

    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
          filterKeys.reduce((x, keyName) =>
            (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
      } else {
        return items.filter(item => {
          console.log(item);
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item.doc[keyName]) || filter[keyName] === '';
          });
        });
      }
    }
  }
}

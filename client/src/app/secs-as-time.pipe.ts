import { Pipe, PipeTransform } from '@angular/core';

// Note on how this needed to be installed:
// https://github.com/jsmreese/moment-duration-format/issues/66
import * as moment from 'moment';
import * as momentDurationFormat from 'moment-duration-format';

@Pipe({
  name: 'secsAsTime'
})
export class SecsAsTimePipe implements PipeTransform {

  transform(value: any, baseUnit?: any, format?: any): any {
    let unitOfTime = 'seconds';
    if (typeof baseUnit === 'undefined') {
      // throw new Error('DurationPipe: missing required time unit argument');
    } else {
      unitOfTime = baseUnit;
    }

    let formatToApply = "h [hrs] m [min] s [secs]";
    if (typeof formatToApply === 'undefined') {
      // throw new Error('DurationPipe: missing required time unit argument');
    } else {
      formatToApply = format;
    }
    return (<any>moment.duration(value, unitOfTime as moment.unitOfTime.DurationConstructor)).format(formatToApply);
/*
    let hours = moment.hours(value);
    let minutes = moment.minutes(value);
    let seconds = moment.seconds(value); */

    /* let dateString = "";
    if (value) {
      var date = new Date(null);
      date.setSeconds(value); // specify value for SECONDS here

      let hours = date.getHours() + "h ";
      let minutes = date.getMinutes();
      let seconds = ":" + date.getSeconds();

      // dateString = date.toISOString().substr(11, 8);
      dateString = hours + minutes + seconds;
      // todo: better formatting
    }
    return dateString; */
  }

}

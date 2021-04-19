import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  formatTime(time) {
    time = new Date(time);
    const hour24 = time.getHours();
    let minutes = (time.getMinutes() === 0) ? '00' : time.getMinutes();
    minutes = (minutes > 0 && minutes < 10) ? `0${minutes}` : minutes;
    const ampm = (hour24 >= 12) ? 'PM' : 'AM';
    let hour: any = hour24 % 12 || 12;
    //append zero is hour is single digit
    if (hour < 10) {
      hour = `0${hour}`;
    }
    return `${hour}:${minutes} ${ampm}`;
  };
  formatDate(date,status) {
    date = new Date(date);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    if (status == 3) return day + 'th ' + monthNames[monthIndex] + " " + year;
    if (status == 2) return day + 'th ' + monthNames[monthIndex];
    if (status == 1) return day;
  };
  timeStampToNewDate(timeStamp) {
    return new Date(timeStamp.seconds * 1000 + Math.round(timeStamp.nanoseconds / 1000000));
  }
}

var year = document.getElementById("year");
var months = document.getElementById("months");
var days = document.getElementById("days");
var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var hours1 = document.getElementById("hours1");
var minutes1 = document.getElementById("minutes1");
var seconds1 = document.getElementById("seconds1");
var hourNeedle = document.getElementById('hours-needle');
var minuteNeedle = document.getElementById('minutes-needle');
var secondNeedle = document.getElementById('seconds-needle');
var year, month, day, hour, minute, second;
var hourDeg,minuteDeg,secondDeg;
var date = new Date();

var fullMonth = [
  31,
  parseInt(isleapYear(date.getFullYear()) ? 29 : 28),
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
function startClock() {
  // Getting Data out of Date Object
  hour = date.getHours();
  minute = date.getMinutes();
  second = date.getSeconds();
  year = date.getFullYear();
  month = date.getMonth();
  day = date.getDate();
 
  hourDeg = 180 + (hour * 30) + (minute > 30 ? (2.5 * 6) : 0);
  minuteDeg = 180 + (minute * 6);
  secondDeg = 180 + (second * 6);

  // Interval to run at every Second to update Clock
  setInterval(() => {
    second++;
    setTime();
    hourNeedle.style.transform = `translateX(-50%) rotateZ(${hourDeg}deg)`;
    minuteNeedle.style.transform = `translateX(-50%) rotateZ(${minuteDeg}deg)`;
    secondNeedle.style.transform = `translateX(-50%) rotateZ(${secondDeg}deg)`;
    updateTimeLeft();
  }, 1000);

  // Applying Degrees on Needles
  hourNeedle.style.transform = `translateX(-50%) rotateZ(${hourDeg}deg)`;
  minuteNeedle.style.transform = `translateX(-50%) rotateZ(${minuteDeg}deg)`;
  secondNeedle.style.transform = `translateX(-50%) rotateZ(${secondDeg}deg)`;
}
// Function will return true on leap year
function isleapYear(year) {
  if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)){
    return year;
  }
}

function setTime() {
 // Minute Completed
 if(second === 60){
  second = 0;
  minute++;
}
if(minute === 30 && second === 0) {
  // Update degree for Hour half way
  hourDeg += 15;
}
// Hour Completed
if(minute === 60 && second === 0){
  minute = 0;
  hour++;
  hour = hour < 24 ? hour : 0;
  // Update degree for Hour
  hourDeg += 15;
}
// Update degree for Minute
minuteDeg = 180 + (minute * 6);
// Update degree for Seconds
secondDeg = 180 + (second * 6);
}

// 3 - Function to update time lefted
function updateTimeLeft() {
// Updating 
seconds.innerHTML = format(60 - second);
minutes.innerHTML = format(60 - minute);
hours.innerHTML = format(23 - hour);
if(hour === 0 && minute === 0 && second === 0) {
  day++;
  if(fullMonth[month] <= day){
      day = 1;
      month++;
      if(month === 12){
          month=0;
          year++;
      }
  }
};
days.innerHTML = format(fullMonth[month] - day);
months.innerHTML = format(12 - (month + 1));
year.innerHTML = year + 1;
}

// Function to return a two digit number
function format(number) {
  return number.toString().length < 2 ? `0${number}` : number;
}

// Starting Clock
startClock();

// Customise timer
function startTimer(){
 
  interval = setInterval(function(){
    seconds1.selectedIndex--;
    if(seconds1.selectedIndex==00 && minutes1.selectedIndex!=00){
      seconds1.value="59";
      minutes1.selectedIndex--;
    }
    if(seconds1.selectedIndex==00 && minutes1.selectedIndex==00 && hours1.selectedIndex!==00){
      hours1.selectedIndex--;
      minutes1.value="59";
      seconds1.value="59";
    }
  },1000);
}
function stopTimer(){
    clearInterval(interval);
}
function resetTimer(){
  hours1.value= "00";
  minutes1.value = "00";
  seconds1.value = "00";
}

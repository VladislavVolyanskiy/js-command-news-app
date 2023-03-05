const CalendarDates = require("calendar-dates");
const calendarDates = new CalendarDates();

const dataSelected = document.querySelector(".data_selected");
const dateField = document.querySelector('.date-field');
const month = document.querySelector(".current_month");
const year = document.querySelector(".current_year");
const monthNext = document.querySelector(".calendar_month_next");
const monthDown = document.querySelector(".calendar_month_down");
const yearNext = document.querySelector(".calendar_year_next");
const yearBack = document.querySelector(".calendar_year_back");
const btnCalendarOpen = document.querySelector(".btn_calendar_open");
const btnCalendarClose = document.querySelector(".btn_calendar_close");
const days = document.querySelector(".days");
const calendar = document.querySelector(".calendar");
const iconCalendar = document.querySelector(".calendar_icon");


// -----вибір місяця і року

let dates = new Date(); 
let currMonth = dates.getMonth();
let currYear = dates.getFullYear();
let currDate = dates.getDate();


dataSelected.textContent = `${addLeadingZero(currDate)}/${addLeadingZero(currMonth + 1)}/${currYear}`;


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

month.innerText = months[currMonth];
year.innerText = currYear;
 

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

// localStorage.setItem("date", "light");

// -----вибір місяця і року

monthNext.addEventListener("click", onNextMonth);
monthDown.addEventListener("click", onDownMonth)
yearNext.addEventListener("click", onNextYear);
yearBack.addEventListener("click", onBackYear);


function onNextMonth() {   
    
    if (currMonth === 11) {
        currMonth = 0;
        month.innerText = months[currMonth]; 
            
    } else {
        currMonth += 1;
        month.innerText = months[currMonth];       
    } 
    
    mainAsync();

    dataSelected.textContent = `${addLeadingZero(currDate)}/${addLeadingZero(months.indexOf(month.textContent) + 1)}/${year.textContent}`;
   
}

function onDownMonth() {

    if (currMonth === 0) {
        currMonth = 11;
        month.innerText = months[currMonth]; 
            
    } else {
        currMonth -= 1;
        month.innerText = months[currMonth];       
    } 
    
    mainAsync(); 

    dataSelected.textContent = `${addLeadingZero(currDate)}/${addLeadingZero(months.indexOf(month.textContent) + 1)}/${year.textContent}`;
    
}

function onNextYear() {   
    currYear += 1;
    year.innerText = currYear;  

    mainAsync();

    dataSelected.textContent = `${addLeadingZero(currDate)}/${addLeadingZero(months.indexOf(month.textContent) + 1)}/${year.textContent}`;
   
}

function onBackYear() {
    currYear -= 1;
    year.innerText = currYear;

    mainAsync();

    dataSelected.textContent = `${addLeadingZero(currDate)}/${addLeadingZero(months.indexOf(month.textContent) + 1)}/${year.textContent}`;
   
}

// --------рендер днів



mainAsync = async () => {
    const data = new Date(Number(year.textContent), months.indexOf(month.textContent));

    const mayDates = await calendarDates.getDates(data);
    console.log(mayDates);

    createMarkup(mayDates);
    
};
mainAsync();

function createMarkup(mayDates) {
   
    const markup = mayDates.map(({ date, type }) => {
        return `<li class="${type}">${date}</li>`;
    }).join('');

    days.innerHTML = markup;
}

// ---------відкриття і закриття календаря---------

btnCalendarOpen.addEventListener("click", onOpenCalendar);

function onOpenCalendar() {
    calendar.classList.toggle('visually-hidden');

    calendar.style.transform = "translateY(0)";
   
    btnCalendarClose.style.display = "block";
    btnCalendarOpen.style.display = "none";

    dataSelected.style.color = "#FFFFFF";
    dateField.style.backgroundColor = "#4440F6";
    iconCalendar.style.fill = "#FFFFFF";
   

}

btnCalendarClose.addEventListener("click", onCloseCalendar);

function onCloseCalendar() {
    calendar.classList.toggle('visually-hidden');
   
    btnCalendarClose.style.display = "none";
    btnCalendarOpen.style.display = "block";

    dataSelected.style.color = "#111321";
    dataSelected.style.opacity = "0.4";
    dateField.style.backgroundColor = "transparent";
    iconCalendar.style.fill = "#4440F7";
}

// -------додавання дати в поле календаря


days.addEventListener("click", onDateSelection);

function onDateSelection(event) {

    dataSelected.textContent = `${addLeadingZero(event.target.textContent)}/${addLeadingZero(months.indexOf(month.textContent) + 1)}/${year.textContent}`;
    
    onCloseCalendar();

}

// -------колір поточної дати



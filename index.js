const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let dataHead = "<tr>";
for (dhead in days) {
  dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = dataHead;

const showCalendar = (month, year) => {
  const firstDay = (new Date(year, month)).getDay();
  const calendarBody = document.getElementById("calendar-body");
  const monthAndYear = document.getElementById("month-and-year");
  calendarBody.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
  drawCalendar(firstDay, calendarBody, month, year);
}


const drawCalendar = (firstDay, calendarBody, month, year) => {
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month]);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span>";
        if (date === today.getDate() && year === today.getFullYear() && 
        month === today.getMonth()) {
          cell.className = "date-picker selected";
        }
        row.appendChild(cell);
        date++;
      }
    }
    calendarBody.appendChild(row);
  }
}

showCalendar(currentMonth, currentYear);


const pipe = (...fns) => (x) => (fns.reduce((y, f) => f(y), x));
const calculateYear = ({ gapNumber, comparisonIndex, initYear, initMonth }) =>
  (initMonth === comparisonIndex) ? initYear + gapNumber : initYear;

const curryCalculateYear = id => initTime => id === 'previous' ?
  calculateYear({
    gapNumber: -1,
    comparisonIndex: 0,
    ...initTime
  })
  : calculateYear({
    gapNumber: 1,
    comparisonIndex: 11,
    ...initTime
  });

//Month section

const calculateMonth = ({ id, initMonth }) => createdYear => ({
  createdYear,
  createdMonth: id === 'previous' ? calculatePreviousMonth(initMonth) 
  : calcuateMonthIndex(1)(initMonth)
});

const calculatePreviousMonth = initMonth =>
  pipe(
    getInitMonthIndex,
    getFinalMonthIndex,
    calcuateMonthIndex(-1)
  )(initMonth);

const getInitMonthIndex = initMonth => initMonth !== 0 ? initMonth + 1 
: initMonth;
const getFinalMonthIndex = initMonthIndex => (initMonthIndex === 0) ? 12 
: initMonthIndex - 1;
const calcuateMonthIndex = gapNumber => intMonth => (intMonth + gapNumber) % 12;

const normalizeTimeData = ({ id, initMonth, initYear }) =>
  id === 'previous' ? ({
    initMonth: getInitMonthIndex(initMonth),
    initYear
  }) : ({
    initMonth,
    initYear
  });

const calculateTime = ({ id, initYear, initMonth }) =>
  pipe(
    normalizeTimeData,
    curryCalculateYear(id),
    calculateMonth({ id, initMonth })
  )({ id, initMonth, initYear })


const trace = label => data => {
  console.log(label, data);
  return data;
}

const handleAll = () =>
  pipe(
    handleDisabled,
    showDateInput,
    showAndHideCalendar,
    clear
  )()

//previous & next button
const btnFunc = (id) => {
  const btn = document.querySelectorAll(`#${id}`);
  btn.forEach(item => item.addEventListener('click', function (e) {
    if (item === btn[0]) {
      const monthAndYear = e.currentTarget.parentNode.parentNode
      .childNodes[1].innerText;
      const arr = monthAndYear.split(' ');
      const findMonth = months.findIndex(month => month == arr[0]);
      const { createdYear, createdMonth } = 
      calculateTime({ id, initMonth: findMonth, initYear: Number(arr[1]) });
      currentYear = createdYear;
      currentMonth = createdMonth;
      const firstDay = (new Date(currentYear, currentMonth)).getDay();
      const calendarBody = e.currentTarget.parentNode.parentNode
      .childNodes[5].childNodes[3];
      calendarBody.innerHTML = "";
      e.currentTarget.parentNode.parentNode.childNodes[1].innerHTML = 
      months[currentMonth] + " " + currentYear;    
      selectYear.value = createdYear;
      selectMonth.value = createdMonth;
      drawCalendar(firstDay, calendarBody, currentMonth, currentYear);
    }
    handleAll();
  }))
} //--end next & previous
btnFunc("next");
btnFunc("previous");

const hidePickDate = ({ calendarBody, month, year }) => {
  calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[1]
  .value = "";
  calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[5]
  .style.display = "none"
  calendarBody.innerHTML = "";
  calendarBody.parentNode.parentNode.childNodes[1].innerHTML = 
  months[month] + " " + year;
}

const showCalendarClone = (month, year) => {
  const firstDay = (new Date(year, month)).getDay();
  const calendarBodys = document.querySelectorAll("#calendar-body");
  calendarBodys.forEach((calendarBody) => {
    if (calendarBody === calendarBodys[calendarBodys.length - 1]) {
      hidePickDate({ calendarBody, month, year });
      selectYear.value = year;
      selectMonth.value = month;
      drawCalendar(firstDay, calendarBody, month, year);
    }
  });
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

function showAndHideCalendar() {
  const pickedCalendars = document.querySelectorAll('#picked-calendar');
  pickedCalendars.forEach(pickedCalendar => {
    pickedCalendar.addEventListener('click', function (e) {
      if (e.currentTarget.parentNode.childNodes[5].style.display == "none") {
        e.currentTarget.parentNode.childNodes[5].style.display = "block";
      }
    })
  })
}
showAndHideCalendar();

function clear() {
  const closeBtns = document.querySelectorAll('#close');
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', function (e) {
      e.currentTarget.parentNode.style.display = "none";
    })
  })
}

const findDay = (e) => {
  const findDay = new Date();
  findDay.setDate(e.currentTarget.getAttribute('data-date'));
  findDay.setMonth(e.currentTarget.getAttribute('data-month') - 1);
  findDay.setFullYear(e.currentTarget.getAttribute('data-year'));
  return findDay;
}

const findInput = (e) => {
  const findInput = e.currentTarget.parentNode.parentNode.parentNode.
    parentNode.parentNode.parentNode.childNodes[1];
  findInput.value = `${days[findDay(e).getDay()]}, ` +
    `${e.currentTarget.getAttribute('data-date')} ` +
    `${e.currentTarget.getAttribute('data-month_name')} ` +
    `${e.currentTarget.getAttribute('data-year')} `;
}

function showDateInput() {
  const datePicked = document.querySelectorAll('.date-picker');
  datePicked.forEach(x => x.addEventListener('click', function (e) {
    findDay(e);
    findInput(e);
    e.currentTarget.parentNode.parentNode.parentNode.
      parentNode.parentNode.style.display = "none";    
  }))
}
showDateInput();

const exampleArray = [
  {
    type: 'timeslot/time',
    start: 1571038965, //10/14/2019
    end: 1572058999 //10/26/2019
  },
  {
    type: 'timeslot/time',
    start: 1574032599, //11/18/2019
    end: 1574633999 //11/25/2019
  }
];

function handleDisabled() {
  exampleArray.map(item => {
    const dateStart = new Date(item.start * 1000);
    const dateEnd = new Date(item.end * 1000);
    const datePickers = document.querySelectorAll('.date-picker');
    datePickers.forEach(datePicker => {
      if (datePicker.dataset.year >= dateStart.getFullYear() && 
      datePicker.dataset.year <= dateEnd.getFullYear()) {
        if (datePicker.dataset.month >= (dateStart.getMonth() + 1) && 
        datePicker.dataset.month <= (dateEnd.getMonth() + 1)) {
          if (datePicker.dataset.date >= dateStart.getDate() && 
          datePicker.dataset.date <= dateEnd.getDate()) {
            datePicker.setAttribute("disabled", "disabled");
            datePicker.style.backgroundColor = "gray";
            datePicker.style.cursor = "not-allowed";
          }
        }
      }
    })
  })
}
handleDisabled();


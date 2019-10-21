//factory, composite, facade, Observer, Adapter, pubsub
const today = new Date();
let currentDay = today.getUTCDay();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let dataHead = "<tr>";
for (dhead in days) {
  dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = dataHead;

monthAndYear = document.getElementById("month-and-year");
showCalendar(currentMonth, currentYear);


//--- next button
const btnNext = document.querySelectorAll('#next');
btnNext.forEach(item => item.addEventListener('click', function (e) {
  if (item === btnNext[0]) {
    const monthAndYear = e.currentTarget.parentNode.parentNode.childNodes[1].innerText;
    const arr = monthAndYear.split(' ');
    const findMonth = months.findIndex(month => month == arr[0]);
    currentMonth = findMonth;
    currentYear = Number(arr[1]);
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;

    const month = currentMonth;
    const year = currentYear;

    const firstDay = (new Date(year, month)).getDay();
    const calendarBody = e.currentTarget.parentNode.parentNode.childNodes[5].childNodes[3];
    calendarBody.innerHTML = "";

    const monthYear = e.currentTarget.parentNode.parentNode.childNodes[1];
    monthYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          cell = document.createElement("td");
          cellText = document.createTextNode("");
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
          if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            cell.className = "date-picker selected";
          }
          row.appendChild(cell);
          date++;
        }
      }
      calendarBody.appendChild(row);
    }
  }
  handleDisabled();
  showDateInput();
  showAndHideCalendar();
  Clear();
}))
//---end next button

//--- prev button
const btnPrev = document.querySelectorAll('#previous');
btnPrev.forEach(item => item.addEventListener('click', function (e) {
  if (item === btnPrev[0]) {
    const monthAndYear = e.currentTarget.parentNode.parentNode.childNodes[1].innerText;
    const arr = monthAndYear.split(' ');
    const findMonth = months.findIndex(month => month == arr[0]);
    if (findMonth !== 0) {
      currentMonth = findMonth + 1;
    }
    currentYear = Number(arr[1]);
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 12 : currentMonth - 1;
    currentMonth = (currentMonth - 1) % 12;

    const month = currentMonth;
    const year = currentYear;

    const firstDay = (new Date(year, month)).getDay();
    const calendarBody = e.currentTarget.parentNode.parentNode.childNodes[5].childNodes[3];
    calendarBody.innerHTML = "";

    const monthYear = e.currentTarget.parentNode.parentNode.childNodes[1];
    monthYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          cell = document.createElement("td");
          cellText = document.createTextNode("");
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
          if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            cell.className = "date-picker selected";
          }
          row.appendChild(cell);
          date++;
        }
      }
      calendarBody.appendChild(row);
    }
  }
  handleDisabled();
  showDateInput();
  showAndHideCalendar();
  Clear();
}))
//---end prev button

function showCalendar(month, year) {
  const firstDay = (new Date(year, month)).getDay();
  const calendarBody = document.getElementById("calendar-body");
  calendarBody.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
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

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected";
        }
        row.appendChild(cell);
        date++;
      }
    }
    calendarBody.appendChild(row);
  }
}

function showCalendarClone(month, year) {
  const firstDay = (new Date(year, month)).getDay();
  const calendarBodys = document.querySelectorAll("#calendar-body");
  calendarBodys.forEach((calendarBody) => {
    if (calendarBody == calendarBodys[calendarBodys.length - 1]) {
      const pickedCalendarClone = calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[1];
      pickedCalendarClone.value = "";
      const wrapperClone = calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[5];
      wrapperClone.style.display = "none";
      calendarBody.innerHTML = "";
      calendarBody.parentNode.parentNode.childNodes[1].innerHTML = months[month] + " " + year;
      selectYear.value = year;
      selectMonth.value = month;

      let date = 1;
      for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            cell = document.createElement("td");
            cellText = document.createTextNode("");
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

            if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
              cell.className = "date-picker selected";
            }
            row.appendChild(cell);
            date++;
          }
        }
        calendarBody.appendChild(row);
      }
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

function Clear() {
  const closeBtns = document.querySelectorAll('#close');
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', function (e) {
      e.currentTarget.parentNode.style.display = "none";
    })
  })
}

function showDateInput() {
  const datePicked = document.querySelectorAll('.date-picker');
  datePicked.forEach(x => x.addEventListener('click', function (e) {
    const findDay = new Date();
    findDay.setDate(e.currentTarget.getAttribute('data-date'));
    findDay.setMonth(e.currentTarget.getAttribute('data-month') - 1);
    findDay.setFullYear(e.currentTarget.getAttribute('data-year'));
    const dayName = days[findDay.getDay()];
    const findInput = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1];

    findInput.value = `${dayName}, ${e.currentTarget.getAttribute('data-date')} ${e.currentTarget.getAttribute('data-month_name')} ${e.currentTarget.getAttribute('data-year')}`;

    const findWrap = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode;
    findWrap.style.display = "none";
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
    timestampStart = item.start;
    const dateStart = new Date(timestampStart * 1000);
    timestampEnd = item.end;
    const dateEnd = new Date(timestampEnd * 1000);
    const datePickers = document.querySelectorAll('.date-picker');
    datePickers.forEach(datePicker => {
      if (datePicker.dataset.year >= dateStart.getFullYear() && datePicker.dataset.year <= dateEnd.getFullYear()) {
        if (datePicker.dataset.month >= (dateStart.getMonth() + 1) && datePicker.dataset.month <= (dateEnd.getMonth() + 1)) {
          if (datePicker.dataset.date >= dateStart.getDate() && datePicker.dataset.date <= dateEnd.getDate()) {
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
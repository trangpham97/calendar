
const today = new Date();
let currentDay = today.getUTCDay();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// alert(days[currentDay]);

let dataHead = "<tr>";
for (dhead in days) {
  dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

//---next
const btnNext = document.querySelectorAll('#next');
btnNext.forEach(x => x.addEventListener('click', function (e) {

  // console.log(e.currentTarget);
  // console.log(e.currentTarget.parentNode.parentNode.childNodes[1]);
  //----test showCalendar2
  if (x == btnNext[0]) {
    // console.log('next 0');
    const monthAndYear = e.currentTarget.parentNode.parentNode.childNodes[1].innerText;
    const arr = monthAndYear.split(' ');
    const a = months.findIndex(x => x == arr[0]);
    // console.log(arr);

    currentMonth = a;
    currentYear = Number(arr[1]);
    // console.log('a');
    // console.log(a);
    // console.log(arr);
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;

    const month = currentMonth;
    const year = currentYear;

    const firstDay = (new Date(year, month)).getDay();
    const calendarBody = e.currentTarget.parentNode.parentNode.childNodes[5].childNodes[3];

    calendarBody.innerHTML = "";

    const aa = e.currentTarget.parentNode.parentNode.childNodes[1];
    aa.innerHTML = months[month] + " " + year;
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

  //end test
  handleDisabled();
  showDateInput();
  showAndHideCalendar();
  Clear();
}))
//---end next

//---prev
const btnPrev = document.querySelectorAll('#previous');
// console.log('ssssss');
btnPrev.forEach(x => x.addEventListener('click', function (e) {
  if (x == btnPrev[0]) {
    // console.log('prev 0');
    const monthAndYear = e.currentTarget.parentNode.parentNode.childNodes[1].innerText;
    // console.log(monthAndYear);
    const arr = monthAndYear.split(' ');
    // console.log(arr);
    const a = months.findIndex(x => x == arr[0]);
    if (a != 0) {
      currentMonth = a + 1;
    }


    // console.log(a);
    currentYear = Number(arr[1]);
    // currentYear = arr[1];
    // console.log(a);
    // console.log(arr);
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 12 : currentMonth - 1;
    currentMonth = (currentMonth - 1) % 12;

    const month = currentMonth;
    const year = currentYear;

    const firstDay = (new Date(year, month)).getDay();
    const calendarBody = e.currentTarget.parentNode.parentNode.childNodes[5].childNodes[3];

    calendarBody.innerHTML = "";

    const aa = e.currentTarget.parentNode.parentNode.childNodes[1];
    aa.innerHTML = months[month] + " " + year;
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

  //end test
  handleDisabled();
  showDateInput();
  showAndHideCalendar();
  Clear();
}))
//---end prev

function showCalendar(month, year) {
  // console.log('showCalendarRoot');
  const firstDay = (new Date(year, month)).getDay();
  const calendarBody = document.getElementById("calendar-body");
  calendarBody.innerHTML = "";

  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  //  TEST LAI SAU!!!
  // document.getElementById('picked-calendar').value = `${days[currentDay]}, ${today.getDate()} ${months[selectMonth.value]} ${selectYear.value}`;

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
        // cell.setAttribute("data-day", days[dhead]);
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
  console.log('showCalendarClone');
  const firstDay = (new Date(year, month)).getDay();
  // console.log('clone');
  // console.log(firstDay);
  // const calendarBody = document.getElementById("calendar-body");
  const calendarBodys = document.querySelectorAll("#calendar-body");
  // console.log (test);
  //note: moi thang co month year khac nhau check lai///
  // how to chi chay thang moi tao

  calendarBodys.forEach((calendarBody) => {
    console.log('hichic');
    // console.log(flag.index);
    if (calendarBody == calendarBodys[calendarBodys.length - 1]) {
      console.log(calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[5]);
      // console.log('right');
      const pickedCalendarClone = calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[1];
      pickedCalendarClone.value = "";

      const wrapperClone = calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[5];
      wrapperClone.style.display = "none";

      calendarBody.innerHTML = "";
      // console.log(months[month]);
      // console.log(year);
      // console.log(calendarBody.parentNode.parentNode.childNodes[1]);
      // monthAndYear.innerHTML = months[month] + " " + year;
      calendarBody.parentNode.parentNode.childNodes[1].innerHTML = months[month] + " " + year;
      selectYear.value = year;
      selectMonth.value = month;

      //TEST LAI SAU!!!!
      // calendarBody.parentNode.parentNode.parentNode.parentNode.childNodes[1].value = `${days[currentDay]}, ${today.getDate()} ${months[selectMonth.value]} ${selectYear.value}`;
      
     
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
            // cell.setAttribute("data-day", days[dhead]);
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
  // console.log(calendarBody);

}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

function showAndHideCalendar() {
  const pickedCalendars = document.querySelectorAll('#picked-calendar');
  // console.log(test);
  pickedCalendars.forEach(pickedCalendar => {
    pickedCalendar.addEventListener('click', function (e) {
      //check again!!
      // console.log('index.js');
      // console.log(e.currentTarget.parentNode.childNodes);
      // console.log(e.currentTarget.parentNode.childNodes[3].style.display);
      if (e.currentTarget.parentNode.childNodes[5].style.display == "none") {
        // console.log(e.currentTarget.parentNode.childNodes[3]);
        e.currentTarget.parentNode.childNodes[5].style.display = "block";
        // console.log('block');
      }
    })
  })
}
showAndHideCalendar();

function Clear() {
  const closeBtns = document.querySelectorAll('#close');
  // console.log(closeBtns);
  // console.log(test);
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', function (e) {
      e.currentTarget.parentNode.style.display = "none";


    })
  })
}
// Clear();



function showDateInput() {
  const datePicked = document.querySelectorAll('.date-picker');


  datePicked.forEach(x => x.addEventListener('click', function (e) {

    // console.log(e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode);
    // console.log(e.currentTarget.getAttribute('data-date'));
    // console.log(e.currentTarget.getAttribute('data-month'));
    // console.log(e.currentTarget.getAttribute('data-year'));

    const findDay = new Date();
    findDay.setDate(e.currentTarget.getAttribute('data-date'));
    findDay.setMonth(e.currentTarget.getAttribute('data-month') - 1);
    findDay.setFullYear(e.currentTarget.getAttribute('data-year'));
    // console.log(e.currentTarget.getAttribute('data-year'));

    const dayName = days[findDay.getDay()];
    const findInput = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1];
    // console.log(e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes);

    // document.getElementById('picked-calendar').value = `${dayName}, ${e.currentTarget.getAttribute('data-date')} ${e.currentTarget.getAttribute('data-month_name')} ${e.currentTarget.getAttribute('data-year')}`;
    findInput.value = `${dayName}, ${e.currentTarget.getAttribute('data-date')} ${e.currentTarget.getAttribute('data-month_name')} ${e.currentTarget.getAttribute('data-year')}`;

    const findWrap = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode;
    // const findWrap = document.querySelector(".wrapper");
    findWrap.style.display = "none";
    // const y = document.querySelector(".wrapper");
    // y.style.display = "none";
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
  //   {
  //     type: 'timeslot/time',
  //     start: 1571018724771,
  //     end: 1571018724971
  //   },
  //  {
  //     type: 'timeslot/time',
  //     start: 1571018727771,
  //     end: 1571018727971
  //   },
];

function handleDisabled() {
  exampleArray.map(item => {
    timestampStart = item.start;
    const dateStart = new Date(timestampStart * 1000);
    // const formattedDateStart = ('0' + dateStart.getDate()).slice(-2) + '/' + ('0' + (dateStart.getMonth() + 1)).slice(-2) + '/' + dateStart.getFullYear();
    // console.log(dateStart.getDate());
    // console.log(dateStart.getMonth() + 1);
    // console.log(dateStart.getFullYear());
    // console.log(formattedDateStart);

    timestampEnd = item.end;
    const dateEnd = new Date(timestampEnd * 1000);
    // const formattedDateEnd = ('0' + dateEnd.getDate()).slice(-2) + '/' + ('0' + (dateEnd.getMonth() + 1)).slice(-2) + '/' + dateEnd.getFullYear();
    // console.log(dateEnd.getDate());
    // console.log(dateEnd.getMonth() + 1);
    // console.log(dateEnd.getFullYear());

    const datePickers = document.querySelectorAll('.date-picker');
    // const datePickers = document.getElementsByClassName('data-picker');
    // console.log(datePickers);
    datePickers.forEach(datePicker => {
      // console.log(datePicker);
      // console.log(datePicker.dataset.date);
      // console.log(datePicker.dataset.month);
      // console.log(datePicker.dataset.year);
      if (datePicker.dataset.year >= dateStart.getFullYear() && datePicker.dataset.year <= dateEnd.getFullYear()) {
        // console.log('year');
        if (datePicker.dataset.month >= (dateStart.getMonth() + 1) && datePicker.dataset.month <= (dateEnd.getMonth() + 1)) {
          // console.log('month');
          if (datePicker.dataset.date >= dateStart.getDate() && datePicker.dataset.date <= dateEnd.getDate()) {
            // console.log('date');

            datePicker.setAttribute("disabled", "disabled");

            datePicker.style.backgroundColor = "gray";
            datePicker.style.cursor = "not-allowed";
            // console.log('aaaa');
          }
        }
      }
    })
  })
}
handleDisabled();







var DateTime = luxon.DateTime,
    localDateTime = DateTime.local(),
    Info = luxon.Info;

var electionYear = 2018,
    electionMonth = 11,
    electionDay = 6,
    electionMonthLong = {month: 'long'},
    electionDate = DateTime.local(electionYear, electionMonth, electionDay);

var months = Info.months('long', {locale: 'en'}),
    totalDays = localDateTime.daysInMonth;

// Minor sections for small screens
function setLongVoteDate (e) {
  var longformDate = Object.assign({ month: 'long', day: 'numeric' });
  $("."+e).text(electionDate.toLocaleString(longformDate));
}

setLongVoteDate('footer-vote-date');
setLongVoteDate('tagline-date-target');
setLongVoteDate('tiny-tagline-date');

if ((localDateTime.month == electionDate.month) && (localDateTime.day == electionDate.day)) {
  $(".container").remove();
  $("footer").remove();
  $(".vote-day-card").fadeTo(1000, 1);
} else {
  $(".vote-day-card").remove();

  // Months section
  for (var i = 0; i < months.length; i++) {
    var electionMonth = parseInt(months.indexOf(electionDate.monthLong));
    var newElement = document.createElement('p');

    newElement.innerHTML = months[i];

    if (electionMonth == i) {
      // If loop iteration number == number of the election month
      // i.e. if 11 == 11
      newElement.classList.add("u-font--color", "u-font--sans", "u-font--500");
      newElement.innerHTML += ".";

    } else if (i+1 < localDateTime.month) {
      // If the current iteration-month is in the past, based on localDateTime
      newElement.classList.add("u-font--gray");

    } else if (i+1 == localDateTime.month) {
      // If current iteration-month is the same as the current localDateTime month
      newElement.classList.add("current-date");

    } else {
      // If current iteration-month is in the future, based on localDateTime
      // Just let the stuff outside this if statement take over.
    }

    $('.months').append(newElement);
  }

  // Days section
  for (var i = 1; i <= totalDays; i++) {
    var newElement = document.createElement('p');
    newElement.innerHTML = i;

    if (i == electionDate.day && electionDate.month == localDateTime.month) {
      // If current iteration index (1–30ish) equals election day number AND it's election month
      newElement.classList.add("u-font--color", "u-font--sans", "u-font--500");
      newElement.innerHTML += ".";

    } else if (i < localDateTime.day) {
      // If current iteration index (1–30ish) is in the past, based on localDateTime
      newElement.classList.add("u-font--gray");

    } else if (i == localDateTime.day) {
      // If current iteration index (1–30ish) is the same as the current localDateTime day
      newElement.classList.add("current-date");

    } else {
      // If current iteration index (1–30ish) is in the future, based on localDateTime
      // Just let the stuff outside this if statement take over.
    }

    $('.days').append(newElement);
  }

  // Actions section
  for (var i = 1; i <= months.length; i++) {
    var newElement = document.createElement('p');
    newElement.innerHTML = "Participate,";

    if (i == (parseInt(months.indexOf(electionDate.monthLong)) + 1)) {
      // If current iteration index equals the index of the election date (1–12ish)
      newElement.classList.add("u-font--color", "u-font--sans", "u-font--500");
      newElement.innerHTML = "Vote.";

    } else if (i < localDateTime.month) {
      // If current iteration index is in the past, according to the localDateTime month
      newElement.classList.add("u-font--gray");

    } else if (i == months.length) {
      // If current iteration index equals the last month
      newElement.innerHTML = "Participate"

    } else if (i > localDateTime.month && i !== months.length+1) {
      // If current iteration index is in the future but isn't the last month
      // Fallback to logic outside the if statement

    } else {
      newElement.classList.add("current-date");
    }

    $('.actions').append(newElement);
  }
}

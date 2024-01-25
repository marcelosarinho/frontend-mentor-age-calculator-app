const error = {
  empty: "This field is required",
  invalidDay: "Must be a valid day",
  invalidMonth: "Must be a valid month",
  invalidYear: "Must be in the past",
  invalidDate: "Must be a valid date",
  invalidType: "Must be a number",
};

function addErrorClass(div) {
  div.children[0].classList.add("error");
  div.children[1].classList.add("error");
}

function resetErrors() {
  document.querySelectorAll("p").forEach((element) => element.remove());
  document
    .querySelectorAll(".error")
    .forEach((element) => element.classList.remove("error"));
}

function getMonthDays(month, year) {
  return new Date(year, month, 0).getDate();
}

function createErrorMessage(errorType) {
  const p = document.createElement("p");
  p.innerText = error[errorType];
  return p;
}

function validateInputType(day, dayDiv, month, monthDiv, year, yearDiv) {
  let wrongType = false;

  if (!day.match(/^[0-9]{1,2}$/)) {
    wrongType = true;

    const p = createErrorMessage("invalidType");
    dayDiv.append(p);
    addErrorClass(dayDiv);
  }

  if (!month.match(/^[0-9]{1,2}$/)) {
    wrongType = true;

    const p = createErrorMessage("invalidType");
    monthDiv.append(p);
    addErrorClass(monthDiv);
  }

  if (!year.match(/^[0-9]{4}$/)) {
    wrongType = true;

    const p = createErrorMessage("invalidType");
    yearDiv.append(p);
    addErrorClass(yearDiv);
  }

  return wrongType;
}

function validateEmpty(day, dayDiv, month, monthDiv, year, yearDiv) {
  let empty = false;

  if (day.trim() === "") {
    empty = true;

    const p = createErrorMessage("empty");
    dayDiv.append(p);
    addErrorClass(dayDiv);
  }

  if (month.trim() === "") {
    empty = true;

    const p = createErrorMessage("empty");
    monthDiv.append(p);
    addErrorClass(monthDiv);
  }

  if (year.trim() === "") {
    empty = true;

    const p = createErrorMessage("empty");
    yearDiv.append(p);
    addErrorClass(yearDiv);
  }

  return empty;
}

function validateDayMonthYear(day, month, year, dayDiv, monthDiv, yearDiv) {
  let invalid = false;

  if (day < 1 || day > 31) {
    invalid = true;

    const p = createErrorMessage("invalidDay");
    dayDiv.append(p);
    addErrorClass(dayDiv);
  }

  if (month < 1 || month > 12) {
    invalid = true;

    const p = createErrorMessage("invalidMonth");
    monthDiv.append(p);
    addErrorClass(monthDiv);
  }

  if (year > new Date().getUTCFullYear()) {
    invalid = true;

    const p = createErrorMessage("invalidYear");
    yearDiv.append(p);
    addErrorClass(yearDiv);
  }

  return invalid;
}

function validateDate(day, month, year, dayDiv, monthDiv, yearDiv) {
  if (day > getMonthDays(month, year)) {
    const p = createErrorMessage("invalidDate");
    dayDiv.append(p);
    addErrorClass(dayDiv);
    addErrorClass(monthDiv);
    addErrorClass(yearDiv);

    return true;
  }

  return false;
}

function computeAge(e) {
  e.preventDefault();

  const day = document.querySelector('[name="day"]').value;
  const month = document.querySelector('[name="month"]').value;
  const year = document.querySelector('[name="year"').value;

  const dayDiv = document.getElementById("day-div");
  const monthDiv = document.getElementById("month-div");
  const yearDiv = document.getElementById("year-div");

  resetErrors();

  if (validateEmpty(day, dayDiv, month, monthDiv, year, yearDiv)) return;
  if (validateInputType(day, dayDiv, month, monthDiv, year, yearDiv)) return;
  if (validateDayMonthYear(day, month, year, dayDiv, monthDiv, yearDiv)) return;
  if (validateDate(day, month, year, dayDiv, monthDiv, yearDiv)) return;

  const dayResult = document.getElementById("days");
  const monthResult = document.getElementById("months");
  const yearResult = document.getElementById("years");

  const userDate = new Date(`${year}-${month}-${day}`).getTime();
  const actualDate = new Date().getTime();

  const result = new Date(actualDate - userDate);
  yearResult.innerText = result.getUTCFullYear() - 1970; // O "epoch" do getTime() é a partir de 1 de Janeiro de 1970
  monthResult.innerText = result.getUTCMonth();
  dayResult.innerText = result.getUTCDate();
}

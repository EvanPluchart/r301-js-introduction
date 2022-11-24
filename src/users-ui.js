import { adultFilter, ageAverage } from "./introduction";

export function createHtmlUser(age) {
  const li = document.createElement("li");
  li.className = "user";
  li.innerHTML += "<input type='text' value='Name' class='input user__name'>";
  li.innerHTML += `<input type='number' value='${age}' class='input user__age'>`;
  li.innerHTML += '<button value="delete" class="input user__delete">delete</button>';
  return li;
}

export function setAddUserEltCallback(addUserElt, usersElt, infoElt) {
  // eslint-disable-next-line no-param-reassign
  infoElt = infoElt || null;
  addUserElt.addEventListener('click', () => {
    const age = Math.floor(Math.random() * (32 - 12 + 1) + 12);
    const userElt = createHtmlUser(age);
    usersElt.appendChild(userElt);
    if (infoElt !== null) {
      // eslint-disable-next-line no-use-before-define
      updateAgeAverage(usersElt, infoElt);
      // eslint-disable-next-line no-use-before-define
      setUserEltCallbacks(userElt, usersElt, infoElt);
    }
  });
}

export function extractUser(userElt) {
  const name = userElt.getElementsByClassName("user__name")[0].value;
  const age = userElt.getElementsByClassName("user__age ")[0].value;
  return { name, age: parseInt(age, 10) };
}

export function extractUsers(usersElt) {
  const users = Array.from(usersElt.querySelectorAll("li.user"));
  const returnUsers = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const user of users) {
    returnUsers.push(extractUser(user));
  }
  return returnUsers;
}

export function extractUserType(infoElt) {
  const infos = Array.from(infoElt.querySelectorAll('input[type="radio"]'));
  let returnValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const info of infos) {
    if (info.checked) {
      returnValue = info.value;
    }
  }
  return returnValue;
}

export function updateAgeAverage(usersElt, infoElt) {
  const average = ageAverage(extractUsers(usersElt), extractUserType(infoElt));
  const HTMLElt = infoElt.querySelector("span.info__age-average");
  HTMLElt.innerText = "";
  if (average !== null) {
    HTMLElt.innerText = parseFloat(average).toFixed(2);
  }
}

export function setUserEltCallbacks(userElt, usersElt, infoElt) {
  const deleteButton = userElt.querySelector('.user__delete');
  deleteButton.addEventListener('click', () => {
    userElt.remove();
    updateAgeAverage(usersElt, infoElt);
  });

  const updateButton = userElt.querySelector('.user__age');
  updateButton.addEventListener('change', () => {
    updateAgeAverage(usersElt, infoElt);
  });
}

export function setAgeTypeEltEvents(usersElt, infoElt)
{
  const form = infoElt.querySelector('.info__age-average-type');
  form.addEventListener('click', () => {
    const adultUsers = adultFilter(usersElt);
    updateAgeAverage(adultUsers, infoElt);
  });
}

export function updateUserClassName(userElt) {
  const age = userElt.querySelector('.user__age').value;
  if (age < 18) {
    userElt.classList.add('user--child');
  } else {
    userElt.classList.remove('user--child');
  }
}
//база данных
let listData = [
  {
    name: "Олег",
    surename: "Иванович",
    lastname: "Мостин",
    age: 18,
    hobby: "Игры",
  },
  {
    name: "Юлия",
    surename: "Александровна",
    lastname: "Воронина",
    age: 21,
    hobby: "Танцы",
  },
  {
    name: "Евгения",
    surename: "Анатольевна",
    lastname: "Ильина",
    age: 18,
    hobby: "Спорт",
  },
  {
    name: "Юлия",
    surename: "Олеговна",
    lastname: "Антонова",
    age: 21,
    hobby: "Спорт",
  },
  {
    name: "Александр",
    surename: "Иванович",
    lastname: "Воронин",
    age: 19,
    hobby: "Танцы",
  },
];
let sortColumnFlag = "fio",
  sortDirFlag = true;
//создание элементов
const $app = document.getElementById("app"),
  $table = document.createElement("table"),
  $tableHead = document.createElement("thead"),
  $tableBody = document.createElement("tbody"),
  $tableHeadTr = document.createElement("tr"),
  $tableHeadThFIO = document.createElement("th"),
  $tableHeadThAge = document.createElement("th"),
  $tableHeadThBirthYear = document.createElement("th"),
  $addForm = document.querySelector("#add-form"),
  $nameInp = document.getElementById("add-form__name-inp"),
  $surenameInp = document.getElementById("add-form__surename-inp"),
  $lastnameInp = document.getElementById("add-form__lastname-inp"),
  $ageInp = document.getElementById("add-form__age-inp"),
  $hobbyInp = document.getElementById("add-form__hobby-inp"),
  $sortFIOBtn = document.getElementById("sort__fio"),
  $sortAgeBtn = document.getElementById("sort__age"),
  $filterForm = document.getElementById("filter-form"),
  $fioFilterInp = document.getElementById("filter-form__fio-inp"),
  $hobbyFilterInp = document.getElementById("filter-form__hobby-inp"),
  $tableHeadThHobby = document.createElement("th");

$table.classList.add("table", "table-dark");

$tableHeadThFIO.textContent = "ФИО";
$tableHeadThAge.textContent = "Возраст";
$tableHeadThBirthYear.textContent = "Год рождения";
$tableHeadThHobby.textContent = "Хобби";

$tableHeadTr.append($tableHeadThFIO);
$tableHeadTr.append($tableHeadThAge);
$tableHeadTr.append($tableHeadThBirthYear);
$tableHeadTr.append($tableHeadThHobby);

$tableHead.append($tableHeadTr);
$table.append($tableHead);
$table.append($tableBody);
$app.append($table);
function createUserTr(oneUser) {
  const $userTr = document.createElement("tr"),
    $userFIO = document.createElement("th"),
    $userAge = document.createElement("th"),
    $userBirthYear = document.createElement("th"),
    $userHobby = document.createElement("th");

  $userFIO.textContent = oneUser.fio;
  $userAge.textContent = oneUser.age;
  $userBirthYear.textContent = oneUser.birthYear;
  $userHobby.textContent = oneUser.hobby;

  $userTr.append($userFIO);
  $userTr.append($userAge);
  $userTr.append($userBirthYear);
  $userTr.append($userHobby);
  return $userTr;
}

//рендер
const copyListData = [...listData];
copyListData.forEach((oneUser) => {
  oneUser.fio = oneUser.name + " " + oneUser.surename + " " + oneUser.lastname;
  let date = new Date();
  oneUser.birthYear = date.getFullYear() - oneUser.age;
});

function render(arrData) {
  $tableBody.innerHTML = "";

  let copyListData = [...arrData];
  copyListData.forEach((oneUser) => {
    oneUser.fio =
      oneUser.name + " " + oneUser.surename + " " + oneUser.lastname;
    let date = new Date();
    oneUser.birthYear = date.getFullYear() - oneUser.age;
  });

  //сортировка
  copyListData = copyListData.sort(function (a, b) {
    console.log(a, b);
    let sort = a[sortColumnFlag] < b[sortColumnFlag];
    if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag];
    return sort ? -1 : 1;
  });

  //фильтрация

  if ($fioFilterInp.value.trim() !== "") {
    copyListData = copyListData.filter(function (item) {
      if (item.fio.indexOf($fioFilterInp.value.trim()) != -1) return true;
    });
  }
  if ($hobbyFilterInp.value.trim() !== "") {
    copyListData = copyListData.filter(function (item) {
      if (item.hobby.indexOf($hobbyFilterInp.value.trim()) != -1) return true;
    });
  }

  //отрисовка
  copyListData.forEach((oneUser) => {
    const $newTr = createUserTr(oneUser);
    $tableBody.append($newTr);
  });
}
render(listData);
//отрисовка

$addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if ($nameInp.value.trim() == "") {
    alert(" Please enter tne name");
    return;
  }
  if ($surenameInp.value.trim() == "") {
    alert("Please enter the surname");
    return;
  }
  if ($ageInp.value.trim() == "") {
    alert("Сколько тебе лет");
    return;
  }
  listData.push({
    name: $nameInp.value,
    surename: $surenameInp.value.trim(),
    lastname: $lastnameInp.value.trim(),
    age: parseInt($ageInp.value.trim()),
    hobby: $hobbyInp.value.trim(),
  });
  render(listData);
  $nameInp.value = "";
  $surenameInp.value = "";
  $lastnameInp.value = "";
  $ageInp.value = "";
  $hobbyInp.value = "";
});
$sortFIOBtn.addEventListener("click", function () {
  sortColumnFlag = "fio";
  sortDirFlag = !sortDirFlag;
  render(listData);
});
$sortAgeBtn.addEventListener("click", function () {
  sortColumnFlag = "age";
  sortDirFlag = !sortDirFlag;
  render(listData);
});
$filterForm.addEventListener("submit", (event) => event.preventDefault());
$fioFilterInp.addEventListener("input", function () {
  render(listData);
});
$hobbyFilterInp.addEventListener("input", function () {
  render(listData);
});

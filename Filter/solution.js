const API_URL = "https://randomuser.me/api?results=50";
const result = document.getElementById("result");
const filter = document.getElementById("filter");

async function getData() {
  const response = await fetch(API_URL);
  const { results } = await response.json();

  //clear result
  result.innerHTML = "";

  //show list
  result.innerHTML = showList(results).join("");

  //show filter
  searchFilter();
}

//get dom array for list
const showList = (persons) => {
  const newArr = persons.map((person) => {
    let imgURL = person.picture.medium;
    let firstName = person.name.first;
    let lastName = person.name.last;
    let city = person.location.city;
    let country = person.location.country;

    return `
    <li>
        <img src="${imgURL}" />
        <div class="user-info">
        <h4>${firstName} ${lastName}</h4>
        <p>${city}, ${country}</p>
        </div>
    </li>
      `;
  });

  return newArr;
};

//search filter
const searchFilter = () => {
  let searchInput = document.querySelector("#filter");

  searchInput.addEventListener("keyup", function (e) {
    let searchChar = e.target.value.toLowerCase();
    let persons = document.getElementsByTagName("li");

    Array.from(persons).forEach((person) => {
      console.dir(person);
      //childNodes
      let childIndex = 3;
      let personText = person.childNodes[childIndex].textContent;

      if (personText.toLocaleLowerCase().indexOf(searchChar) !== -1) {
        person.style.display = "block";
      } else {
        person.style.display = "none";
      }
    });
  });
};

getData();

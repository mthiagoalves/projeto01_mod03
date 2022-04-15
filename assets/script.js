const baseURL = "http://localhost:3000/guitars";

async function findAllGuitars() {
  const response = await fetch(`${baseURL}/find-guitar`);

  const guitars = await response.json();

  guitars.forEach(function (guitars) {
    document.querySelector("#container").insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <div class="img-card">
          <img src="${guitars.img}" />
        </div>
        <div class="content">
          <h2>${guitars.name}</h2>
          <p class="model">${guitars.model}</p>
          <p class="description">
          ${guitars.description}
          </p>
          <span class="price">$ ${guitars.price}</span>
          <a type="button" class="btn-edit">EDIT</a>
          <a type="button" class="btn-delete">Delete</a>
        </div>
      </div>
    `
    );
  });
}

async function findByIdGuitars() {
  const id = document.querySelector("#id-guitar").value;

  const response = await fetch(`${baseURL}/guitar/${id}`);

  const guitar = await response.json();

  console.log(guitar);

  const guitarSelect = document.querySelector(".selected-guitar");

  guitarSelect.innerHTML = `
    <div class="card-item">
      <div class="img-card-item">
        <img src="${guitar.img}"/>
      </div>
      <div class="content-item">
        <h2>${guitar.name}</h2>
        <p class="model">${guitar.model}</p>
        <p class="description">
        ${guitar.description}
        </p>
        <span class="price">$ ${guitar.price}</span>
      </div>
    </div>
  `;
}

findAllGuitars();

function popupToggle() {
  const popup = document.getElementById("popup");
  popup.classList.toggle("active");
}

async function createGuitar() {
  let name = document.querySelector("#name").value;
  let model = document.querySelector("#model").value;
  let description = document.querySelector("#description").value;
  let price = document.querySelector("#price").value;
  let img = document.querySelector("#img").value;

  const guitar = {
    name,
    model,
    description,
    price,
    img,
  };

  const response = await fetch(`${baseURL}/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(guitar),
  });

  const newGuitar = await response.json();

  const html = `
  <div class="card-item">
      <div class="img-card-item">
        <img src="${newGuitar.img}"/>
      </div>
      <div class="content-item">
        <h2>${newGuitar.name}</h2>
        <p class="model">${newGuitar.model}</p>
        <p class="description">
        ${newGuitar.description}
        </p>
        <span class="price">$ ${newGuitar.price}</span>
      </div>
    </div>
  `;

  document.querySelector(".container").insertAdjacentHTML("beforeend", html);

  name = "";
  model = "";
  description = "";
  price = "";
  img = "";
}

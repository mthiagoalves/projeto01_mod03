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

function createGuitar() {
  const name = document.querySelector("#name");
  const model = document.querySelector("#model");
  const description = document.querySelector("#description");
  const price = document.querySelector("price");
  const img = document.querySelector("#img");

  const guitar = {
    name,
    model,
    description,
    price,
    img,
  };

  const response = await fetch(`${baseURL}/create`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify(guitar),
  });

  const newGuitar = await response.json();

  const html= `
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

  document.querySelector('#container').insertAdjacentHTML('beforeend', html)
}

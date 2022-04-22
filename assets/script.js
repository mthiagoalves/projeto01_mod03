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
          <a type="button" class="btn-edit" onclick="popupToggle('${guitars._id}')">EDIT</a>
          <a type="button" class="btn-delete" onclick="openModalDel('${guitars._id}')">Delete</a>
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

async function popupToggle(id = "") {
  if (id != "") {
    document.querySelector("#modal-tittle").innerText = "Edit a New Guitar!";
    document.querySelector(".btn-1").innerText = "Done!";

    const response = await fetch(`${baseURL}/guitar/${id}`);
    const guitars = await response.json();

    document.querySelector("#name").value = guitars.name;
    document.querySelector("#model").value = guitars.model;
    document.querySelector("#description").value = guitars.description;
    document.querySelector("#price").value = guitars.price;
    document.querySelector("#img").value = guitars.img;
    document.querySelector("#id").value = guitars._id;
  } else {
    document.querySelector("#modal-tittle").innerText =
      "Register a new guitar!";
    document.querySelector(".btn-1").innerText = "Register";

    document.querySelector("#name").value = "";
    document.querySelector("#model").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#img").value = "";
  }

  const popup = document.querySelector("#popup");
  popup.classList.toggle("active");
}

async function createGuitar() {
  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const model = document.querySelector("#model").value;
  const description = document.querySelector("#description").value;
  const price = document.querySelector("#price").value;
  const img = document.querySelector("#img").value;

  const guitar = {
    name,
    model,
    description,
    price,
    img,
  };

  const modeActived = id > 0;

  const endpoint = baseURL + (modeActived ? `/update/${id}` : `/create`);

  const response = await fetch(endpoint, {
    method: modeActived ? "put" : "post",
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

  if (modeActived) {
    document.querySelector(`#guitar-list-id_${id}`).outerHTML = html;
  } else {
    document.querySelector(".container").insertAdjacentHTML("beforeend", html);
  }
}

function openModalDel(id) {
  const popupDel = document.querySelector("#popup-delete");
  popupDel.classList.toggle("activeDel");

  const btnYes = document.querySelector(".btn-yes");

  btnYes.addEventListener("click", function () {
    delGuitar(id);
  });
}

async function delGuitar(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const result = await response.json();
  alert(result.message);

  document.querySelector(".container").innerText = "";

  openModalDel();
  findAllGuitars();
}

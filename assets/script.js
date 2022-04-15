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

function popupToggle() {
  const popup = document.getElementById("popup");
  popup.classList.toggle("active");
}

findAllGuitars();

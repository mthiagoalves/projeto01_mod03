const baseURL = "http://localhost:3000/guitars";

const msgAlert = document.querySelector(".msg-alert");

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

findAllGuitars();

async function findByIdGuitars() {
  const id = document.querySelector("#id-guitar").value;

  if (id == "") {
    localStorage.setItem("message", "Enter a ID");
    localStorage.setItem("type", "alert");

    msgAlert.innerHTML = localStorage.getItem("message");
    msgAlert.classList.add(localStorage.getItem("type"));
    closeMsgAlert();
    return;
  }

  const response = await fetch(`${baseURL}/guitar/${id}`);

  const guitar = await response.json();

  if (guitar.message != undefined) {
    localStorage.setItem("message", guitar.message);
    localStorage.setItem("type", "alert");

    showMessageAlert();
    return;
  }

  document.querySelector(".home").style.display = "block";
  document.querySelector(".container").style.display = "none";
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
        <a type="button" class="btn-edit" onclick="popupToggle('${guitar._id}')">EDIT</a>
        <a type="button" class="btn-delete" onclick="openModalDel('${guitar._id}')">Delete</a>
      </div>
    </div>
  `;
}

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

  const modeActived = id != "";

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

  if (newGuitar.message != undefined) {
    localStorage.setItem("message", "Send all info the guitar");
    localStorage.setItem("type", "alert");

    showMessageAlert();
    return;
  }

  if (modeActived) {
    localStorage.setItem("message", "Updated Guitar");
    localStorage.setItem("type", "sucess");
  } else {
    localStorage.setItem("message", "Created Guitar");
    localStorage.setItem("type", "sucess");

    msgAlert.innerHTML = localStorage.getItem("message");
    msgAlert.classList.add(localStorage.getItem("type"));
  }
  document.location.reload(true);
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

  document.location.reload(true);

  localStorage.setItem("message", result.message); //mostra a msg na tela
  localStorage.setItem("type", "alert"); //mostra a msg na tela

  openModalDel();
}

//function com setTimeOut para fechar a mensagem de alerta com tempo
closeMsgAlert = () => {
  setTimeout(function () {
    msgAlert.innerHTML = "";
    msgAlert.classList.remove(localStorage.getItem("type"));
    localStorage.clear();
  }, 3000);
};

//function para mostrar as mensagens
showMessageAlert = () => {
  msgAlert.innerHTML = localStorage.getItem("message");
  msgAlert.classList.add(localStorage.getItem("type"));
  closeMsgAlert();
};

//function para ativar o input ao apertar o enter
const keyEnter = document.getElementById("id-guitar");
keyEnter.addEventListener("keyup", function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) {
    //código da tecla enter é o 13
    findByIdGuitars();
  }
});

showMessageAlert();

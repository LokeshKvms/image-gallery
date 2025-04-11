const app = document.getElementById("app");
let currentPage = 1;
let totalPages = 1;

function fetchUsers(page = 1) {
  fetch(`https://reqres.in/api/users?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      totalPages = data.total_pages;
      displayUsers(data.data);
      displayPagination(page);
    });
}

function displayUsers(users) {
  app.innerHTML = "<h1>- - - - - G A L L E R Y - - - - -</h1>";

  const flexContainer = document.createElement("div");
  flexContainer.className = "flex";

  users.forEach((user) => {
    const userDiv = document.createElement("div");

    const img = document.createElement("img");
    img.src = user.avatar;
    img.alt = `${user.first_name}'s avatar`;
    img.style.cursor = "pointer";
    img.onclick = () => {
      window.open(`user.html?id=${user.id}`, "_self");
    };

    const nameP = document.createElement("p");
    nameP.innerHTML = `<strong>${user.first_name} ${user.last_name}</strong>`;

    const emailP = document.createElement("p");
    emailP.textContent = user.email;

    userDiv.appendChild(img);
    userDiv.appendChild(nameP);
    userDiv.appendChild(emailP);

    flexContainer.appendChild(userDiv);
  });

  app.appendChild(flexContainer);
}

function displayPagination(page) {
  const pagination = document.createElement("div");
  pagination.className = "pagination";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = page === 1;
  prevBtn.onclick = () => {
    currentPage--;
    fetchUsers(currentPage);
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = page === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    fetchUsers(currentPage);
  };

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${page} of ${totalPages}`;

  pagination.appendChild(prevBtn);
  pagination.appendChild(pageInfo);
  pagination.appendChild(nextBtn);

  app.appendChild(pagination);
}

fetchUsers(currentPage);

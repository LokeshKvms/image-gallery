const container = document.getElementById("user-profile");

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

if (!userId) {
  container.innerHTML = "<p>User ID not provided.</p>";
} else {
  fetch(`https://reqres.in/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      const user = data.data;

      if (!user) {
        container.innerHTML = "<p>User not found.</p>";
        return;
      }

      const profileCard = document.createElement("div");
      profileCard.className = "profile-card";

      profileCard.innerHTML = `
        <img src="${user.avatar}" alt="${user.first_name}" />
        <h2>${user.first_name} ${user.last_name}</h2>
        <p>${user.email}</p>
        <a class="back-link" href="index.html">← Back to gallery</a>
      `;

      container.appendChild(profileCard);
    })
    .catch(() => {
      container.innerHTML = "<p>Error loading user.</p>";
    });
}

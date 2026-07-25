let allUsers = [];

const usersContainer = document.getElementById("users");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const citySelect = document.getElementById("city");


    async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}

function displayUsers(users) {
    usersContainer.innerHTML = "";

    users.forEach(user => {
        const userCard = document.createElement("div");

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <p>${user.address.city}</p>
            <hr>
        `;

        usersContainer.appendChild(userCard);
    });
}

async function init() {
    allUsers = await fetchUsers();
    displayUsers(allUsers);

    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();

        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );

        displayUsers(filtered);
    });
}

init();
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
function updateUsers() {
    let filtered = [...allUsers];

    // Search
    const query = searchInput.value.toLowerCase();
    filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    // Filter by city
    if (citySelect.value !== "") {
        filtered = filtered.filter(user =>
            user.address.city === citySelect.value
        );
    }

    // Sort
    if (sortSelect.value === "az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortSelect.value === "za") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayUsers(filtered);
}

async function init() {
    allUsers = await fetchUsers();
    displayUsers(allUsers);

    const cities = [...new Set(allUsers.map(user => user.address.city))];

cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
});

    searchInput.addEventListener("input", updateUsers);
sortSelect.addEventListener("change", updateUsers);
citySelect.addEventListener("change", updateUsers);
}

init();


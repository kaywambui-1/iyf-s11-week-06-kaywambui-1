// Basic fetch
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log("Response object:", response);
        console.log("Status:", response.status);
        console.log("OK:", response.ok);
        return response.json();  // Parse JSON
    })
    .then(data => {
        console.log("User data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });

    async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

// Use it
getUser(1).then(user => {
    console.log(user);
});

// practice 1
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json())
    .then(user => {
        console.log("Practice - Single User:", user);
    })
    .catch(error => {
        console.error(error);
    });

// practice 2
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(user => {
        console.log("Practice - All Users:", user);
    })
    .catch(error => {
        console.error(error);
    });

    // post for 1 user
    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
    .then(response => response.json())
    .then(posts => {
        console.log("Practice - User 1 posts:", posts);
    })
    .catch(error => {
        console.error(error);
    });
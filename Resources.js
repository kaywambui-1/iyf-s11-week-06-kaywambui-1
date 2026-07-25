const postForm = document.getElementById("postForm");
const result = document.getElementById("result");

async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            userId
        })
    });
    
    if (!response.ok) {
        throw new Error("Failed to create post");
    }
    
    return response.json();
}

postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const userId = document.getElementById("userId").value;

    try {
        const newPost = await createPost(title, body, userId);

        console.log("Created:", newPost);

        result.textContent = JSON.stringify(newPost, null, 2);
    } catch (error) {
        result.textContent = error.message;
    }
});
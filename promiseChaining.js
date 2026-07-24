// After refactoring to Promises:
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if (userId > 0){
                resolve({
                    id: userId,
                    name: "Christine"
                });
            } else {
                reject("invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve([
                {id: 101, title: "My first post"},
                {id: 102, title: "Learning Promises"}
            ])
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing"}   
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}


getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });
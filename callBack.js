
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("It worked!");
        } else {
            reject("Something went wrong");
        }
    }, 1000);
});

myPromise
.then(result => {
    console.log("Success:", result);
})
.catch(error => {
    console.log("Error:", error);
})


function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}


function getUserPost(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Post 1" });
                 resolve({ id: userId, name: "Post 2" });
            } else {
                reject("Invalid user Post");
            }
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
    return getUserPost(user.id);
   })
    .then(posts => {
    console.log("Posts:", posts);
    return getPostComments(posts.id);
   })

   .then(Comments => {
    console.log("Comments:", Comments);
   })
   
   .catch(error => {
    console.log("Error!", error);
   });
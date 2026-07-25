function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if (userId > 0){
                resolve({ id: userId,
                    name: "Christine"});
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
                {id: 101, title: "My first post"}
            ])
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
                resolve([
                     "Great post!" 
                     
                ]);
        }, 1000);
    });
}


function getDataWithPromises() {
    return getUserData(1)
        .then(user => getUserPosts(user.id))
        .then(posts => getPostComments(posts[0].id))
        .then(comments => comments);
}

async function fetchUserData(userId) {
    try{
    const user = await getUserData(userId);
    const posts = await getUserPosts(user.id);

    return {user, posts};

    } catch (error) {
        console.error("Failed to fetch:", error);
    }
}

fetchUserData(1)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log("Error cought:", error)
    });


    async function getAllUsers() {
    // Sequential (slow):
    const user1 = await getUserData(1);
    const user2 = await getUserData(2);
    const user3 = await getUserData(3);
    
    console.log("Sequential:", user1, user2, user3);

    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
     console.log("Parallel:", u1, u2, u3,);
      
     return [u1, u2, u3];
}

getAllUsers()
    .then(users =>{
        console.log("Returned users:", users);
    });


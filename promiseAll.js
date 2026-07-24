const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
.then(results => {
    console.log("All users:", results);
})
.catch(error => {
        console.error("One failed:", error);
    });


    const fast = new Promise(resolve =>
        setTimeout(() => resolve("Fast!"), 600)
    );
    const slow = new Promise(resolve =>
        setTimeout(() => resolve("Slow!"), 200)
    );
    Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });
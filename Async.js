console.log("1 - Start");
console.log("2 - Middle");
console.log("3 End");

console.log("1 - Start");
setTimeout(() => {
    console.log("2 - This  is delayed");
}, 2000);

console.log("3 - End");

console.log("A");
 setTimeout(() => console.log("B"), 0);

 console.log("C");
 setTimeout(() => console.log("D"), 100);
 console.log("E");
 // Exercise 2

 function fetchData(callback){
    setTimeout(() =>{
        const data = {name:"John", age:30};
        callback(data);
    }, 1000);
 }
 fetchData(function(data){
    console.log("Data recieved:",data);
 });


 // build  a function that simulates loading user data
 function loadUser(userId, callback){
    setTimeout(() => {
        const user = {
    id: userId,
    name: "John",
    age: 30
 };
 callback(user);
    }, 1500);
    
 }
 loadUser(1, function(user) {
    console.log("user loaded:", user);
 });

 loadUser(2, function(user) {
    console.log("user loaded:", user);
 });


 
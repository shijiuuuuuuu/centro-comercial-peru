
// REGISTER
function register(){

let users = JSON.parse(localStorage.getItem("users")||"[]");

users.push({
name: name.value,
phone: phone.value,
password: pass.value,
balance: 10,
vip: 1
});

localStorage.setItem("users",JSON.stringify(users));

alert("Created");
location.href="index.html";
}


// LOGIN
function login(){

let users = JSON.parse(localStorage.getItem("users")||"[]");

let user = users.find(u =>
u.phone==phone.value && u.password==pass.value
);

if(!user){
alert("Wrong login");
return;
}

localStorage.setItem("currentUser",JSON.stringify(user));

location.href="dashboard.html";
}


// LOAD DASHBOARD
if(location.pathname.includes("dashboard")){

let u = JSON.parse(localStorage.getItem("currentUser"));

bal.innerText = u.balance;
vip.innerText = u.vip;
}


// VIP ORDER
let count = localStorage.getItem("orders")||0;

function doOrder(){

count++;

localStorage.setItem("orders",count);

if(document.getElementById("count")){
document.getElementById("count").innerText = count+"/12";
}

}


// BANK
function connectBank(){
localStorage.setItem("bank","ok");
alert("Bank connected");
}


// WITHDRAW
function withdraw(){

if(!localStorage.getItem("bank")){
alert("Connect bank first");
return;
}

if((localStorage.getItem("orders")||0)<12){
alert("Complete orders");
return;
}

alert("Withdraw success");
}

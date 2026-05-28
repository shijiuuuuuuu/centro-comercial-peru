const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/vipSystem");

/* ================= USER MODEL ================= */

const User = mongoose.model("User", {

name: String,
phone: String,
password: String,

balance: { type: Number, default: 0 },

vipLevel: { type: Number, default: 0 },

ordersCompleted: { type: Number, default: 0 },

ordersLimit: { type: Number, default: 0 },

bankConnected: { type: Boolean, default: false },

withdrawLocked: { type: Boolean, default: true }

});

/* ================= REGISTER ================= */

app.post("/register", async (req, res) => {

let user = new User(req.body);
await user.save();

res.json(user);

});

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {

let user = await User.findOne({
phone: req.body.phone,
password: req.body.password
});

if(!user){
return res.status(400).json({error:"Invalid"});
}

res.json(user);

});

/* ================= GET USERS (ADMIN) ================= */

app.get("/users", async (req, res) => {

let users = await User.find();
res.json(users);

});

/* ================= APPROVE USER ================= */

app.post("/approve/:id", async (req, res) => {

await User.findByIdAndUpdate(req.params.id, {
withdrawLocked: false,
balance: 50
});

res.json({success:true});

});

/* ================= VIP UPDATE ================= */

app.post("/vip/:id", async (req, res) => {

await User.findByIdAndUpdate(req.params.id, req.body);

res.json({success:true});

});

app.listen(3000, () => {
console.log("SERVER RUNNING http://localhost:3000");
});

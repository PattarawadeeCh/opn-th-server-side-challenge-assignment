import { Info } from "./mockdata";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser')
let data: any[] = [];
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req: any, res: any) => {
    console.log(req.headers);
    const authorization = req.headers["authorization"];
    if (authorization !== "Bearer_faketoken_user1") {
        return res.status(500).json({
            message: "No token! ",
            type: "error",
        });
    }
    console.log(res);

    res.send("hi");
});

app.get("/person/:personId", (req: any, res: any) => {
    let id = req.params.personId
    res.send(`Hello! I am person id = ${id}`);
});

app.post("/register", (req: any, res: any) => {
    const authorization = req.headers["authorization"];
    if (authorization !== "Bearer_faketoken_user1") {
        return res.status(500).json({
            message: "No token! ",
            type: "error",
        });
    }
    var id = "id" + Math.random().toString(16).slice(2)
    data.push({
        id: id,
        Name: req.body.Name,
        email: req.body.email,
        password: req.body.password,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        address: req.body.address
    })
    console.log(data);

    res.send(`Hello! ${req.body.Name}. I am from POST`);
});

app.post("/gatProfile", (req: any, res: any) => {
    const authorization = req.headers["authorization"];
    if (authorization !== "Bearer_faketoken_user1") {
        return res.status(500).json({
            message: "No token! ",
            type: "error",
        });
    }
    let info;
    for (let i = 0; i < data.length; i++) {
        if (data[i].Name = req.body.Name) {
            console.log(data[i].date_of_birth);
            // var ageDifMs = Date.now() - data[i].date_of_birth.getTime();
            var ageDifMs = Date.now() - Date.parse(data[i].date_of_birth);
            console.log(ageDifMs);
            var ageDate = new Date(ageDifMs);
            console.log(ageDate, ageDate.getUTCFullYear());

            info = {
                Name: data[i].Name,
                email: data[i].email,
                age: Math.abs(ageDate.getUTCFullYear() - 1970),
                gender: data[i].gender,
                address: data[i].address
            }
            console.log(info);
        }
    }
    res.send(info);
});

app.post("/updateinfo", (req: any, res: any) => {
    const authorization = req.headers["authorization"];
    if (authorization !== "Bearer_faketoken_user1") {
        return res.status(500).json({
            message: "No token! ",
            type: "error",
        });
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].id = req.body.id) {
            if (req.body.date_of_birth !== null) {
                data[i].date_of_birth = req.body.date_of_birth
            }
            if (req.body.gender !== null) {
                data[i].gender = req.body.gender
            }
            if (req.body.address !== null) {
                data[i].address = req.body.address
            }
        }
    }
    console.log(data);
    res.send(data);
});

app.post("/changPassword", async (req: any, res: any) => {
    const authorization = req.headers["authorization"];
    if (authorization !== "Bearer_faketoken_user1") {
        return res.status(500).json({
            message: "No token!",
            type: "error",
        });
    }
    for (let i = 0; i < data.length; i++) {

        if (data[i].id = req.body.id) {
            if (req.body.password === data[i].password) {
                data[i].password = req.body.new_password
            } else {
                return res.send("Password is incorrect.");
            }
        }
    }
    console.log(data);
    res.send(data);
});

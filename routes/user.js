const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Create and Save a Record of a Model:
// Person.create({
//     name: "basma",
//     age: 15,
//     favoriteFoods: ["cheesecake", "burritos"],
// });
// var createAndSavePerson = () => {
//     Person.save((err, data) => {
//         if (err) {
//             return err;
//         } else {
//             return "group of persons is added";
//         }
//     });
// };

// Create Many Records with model.create()
// Person.create([
//     { name: "houssem", age: 15, email: "houssem@gmail.com" },
//     { name: "amir", age: 9, email: "amir@gmail.com" },
//     { name: "wissal", age: 10, email: "wissal@gmail.com" },
//     { name: "asma", age: 19, email: "asma@gmail.com" },
// ]);
// var createAndSavePerson = () => {
//     Person.save((err, data) => {
//         if (err) {
//             return err;
//         } else {
//             return "group of persons is added";
//         }
//     });
// };

//get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ msg: "list of persons:", users });
    } catch (error) {
        res.status(500).send("failed to show the persons");
    }
});
//result on postman
// {
//     "msg": "list of persons:",
//     "persons": [
//         {
//             "_id": "60838175610e439c75e773bc",
//             "name": "houssem",
//             "age": 15,
//             "email": "houssem@gmail.com",
//             "__v": 0
//         },
//         {
//             "_id": "60838175610e439c75e773bd",
//             "name": "amir",
//             "age": 9,
//             "email": "amir@gmail.com",
//             "__v": 0
//         },
//         {
//             "_id": "60838175610e439c75e773be",
//             "name": "wissal",
//             "age": 10,
//             "email": "wissal@gmail.com",
//             "__v": 0
//         },
//         {
//             "_id": "60838175610e439c75e773bf",
//             "name": "asma",
//             "age": 19,
//             "email": "asma@gmail.com",
//             "__v": 0
//         }
//     ]
// }

//add a new user
router.post("/", async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const user = new User({ name, age, email });
        await user.save();
        res.status(200).send({ mssg: "user added", user });
    } catch (error) {
        res.status(500).send("failed to add the user");
    }
});
//result on postman
// {
//     "mssg": "user added",
//     "user": {
//         "_id": "60838912d3089f994126f438",
//         "name": "youssef",
//         "age": 24,
//         "email": "youssef@gmail.com",
//         "__v": 0
//     }
// }

//edit a user
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: { age: 35 } }
        );
        user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("failed to update the user");
    }
});
//result
// {
//     "_id": "60838175610e439c75e773bd",
//     "name": "amir",
//     "age": 35,
//     "email": "amir@gmail.com",
//     "__v": 0
// }

//delete a user

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOneAndRemove({ _id: id });
        user.save();
        res.status(200).send({ mssg: "user is removed", user });
    } catch (error) {
        res.status(500).send("failed to remove the user");
    }
});
//result
// {
//     "mssg": "user is removed",
//     "user": {
//         "_id": "60838175610e439c75e773bf",
//         "name": "asma",
//         "age": 19,
//         "email": "asma@gmail.com",
//         "__v": 0
//     }
// }

module.exports = router;

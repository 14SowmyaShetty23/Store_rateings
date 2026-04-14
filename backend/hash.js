const bcrypt = require("bcryptjs");

const password = "123456";

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Hashed Password:", hash);
    }
});
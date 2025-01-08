const bcrypt = require("bcrypt");



const hashpassword = async (password) => {
    const saltrounds= 10;

    const newpass = await bcrypt.hash(password, saltrounds);
    return newpass;
}

const comparepasswords = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword);
}

module.exports = {
    comparepasswords, hashpassword
};

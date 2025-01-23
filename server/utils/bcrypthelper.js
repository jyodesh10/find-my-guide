import * as bcrypt from "bcrypt";
const hashpassword = async (password) => {
    const saltrounds = 10;
    const newpass = await bcrypt.hash(password, saltrounds);
    return newpass;
};
const comparepasswords = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword);
};
export { comparepasswords };
export { hashpassword };
export default {
    comparepasswords,
    hashpassword
};

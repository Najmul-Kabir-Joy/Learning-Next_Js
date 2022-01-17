import { hash, compare } from "bcryptjs";

export const hashPassword = async (password) => {
    const hashedPass = await hash(password, 12);
    return hashedPass;
}

export const verifyPassword = async (password, hashedPass) => {
    const isValid = await compare(password, hashedPass);

    return isValid;

}
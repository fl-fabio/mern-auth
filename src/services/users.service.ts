import { IUser } from "../types/user.interface";
import { User } from "../models/user.model";

export const createUser = async (user: IUser ) => {
    return await User.create(user);
}

export const findUserByEmail = async(email: string) => {
    return await User.findOne({email});
}

export const findUserById = async (id: string) => {
    return await User.findById(id);
}
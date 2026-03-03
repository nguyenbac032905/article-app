
import User from "../models/user.model";
import md5 from "md5";

export const resolversUser = {
    Query: {
        getUser: async (_,args, context) => {
            if(context["user"].token) {
                const user = await User.findOne({token: context["user"].token,deleted: false});
            
                if(user){
                    return {
                        code: 200,
                        message: "Thanh cong",
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        token: user.token
                    }
                }
            }
            return {
                code: 400,
                message: "That bai"
            }
        }
    },
    Mutation: {
        registerUser:async (_,args) => {
            const {user} = args;

            const existEmail = await User.findOne({email: user.email});
            if(existEmail){
                return {
                    code: 400,
                    message: "email da ton tai"
                }
            }
            user.password = md5(user.password);
            const record = new User(user);
            await record.save();
            return{
                code: 200,
                message: "dang ky thanh cong",
                id: record.id,
                fullName: record.fullName,
                email: record.email,
                token: record.token
            }
        },
        loginUser: async (_,args) => {
            const {email,password} = args.user;
            
            const existUser = await User.findOne({deleted: false, email: email});
            if(!existUser){
                return {
                    code: 400,
                    message: "Email khong ton tai"
                }
            }
            if(existUser.password != md5(password)){
                return {
                    code: 400,
                    message: "Sai mat khau"
                }
            }
            return {
                code: 200,
                message: "Dang nhap thanh cong",
                fullName: existUser.fullName,
                email: existUser.fullName,
                token: existUser.token
            }
        }
    }
};
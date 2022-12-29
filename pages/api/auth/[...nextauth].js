
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from 'mongodb';

const bcrypt = require("bcryptjs")

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                try {

                    const client = await MongoClient.connect("mongodb://localhost:27017/olx");
                    const users = client.db().collection("users");

                    const user = await users.findOne({email: credentials.email});

                    if(!user){
                        client.close();
                        throw new Error("User Not Found")
                    }

                    const checkPass = await bcrypt.compare(credentials.password,user.password);
                    // console.log(checkPass);

                    if(!checkPass){
                        client.close();
                        throw new Error("Incorrect Password")
                    }

                    // const userId = user._id.toString();
                    // console.log(userId);



                    client.close();
                    return {
                        email: user.email,
                        name: user.email.split("@")[0]
                    }
                    
                } catch (error) {
                    console.log("SignIn error ::")
                    console.log(error);
                    throw new Error('Something went wrong');
                }
            }
        })
    ]
});
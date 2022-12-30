
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from 'mongodb';

const bcrypt = require("bcryptjs")

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                try {

                    const client = await MongoClient.connect(`${process.env.MONGO_URL}`);
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
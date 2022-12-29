import { MongoClient } from "mongodb";
const bcrypt = require("bcryptjs")

const handler = async (req,res) => {

    if(req.method === "POST"){

        try {

            const {email,password} = req.body;

            const client = await MongoClient.connect("mongodb://localhost:27017/olx");
            const db = client.db();

            const existing = await db
                .collection("users")
                .findOne({email:email});
            
            if(existing){
                res.status(200).json({ 
                    success:false,
                    message: 'User already exists' 
                });

                client.close();
                return;
            }
            
            const hashPass = await bcrypt.hash(password,10)

            const response = await db.collection("users").insertOne({
                email:email,
                password: hashPass,
                products: []
            })

            console.log(response);

            res.status(201).json({
                success: true,
                message: "User registered Successfully"
            })

            client.close();

        } catch (error) {
            
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    }
}

export default handler;
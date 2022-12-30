import { MongoClient } from "mongodb";

const products = async (req,res) => {
    if(req.method === "POST"){
        try {
            const client = await MongoClient.connect(`${process.env.MONGO_URL}`);
            const db = client.db();
            const users = db.collection("users");
            const products = db.collection("products")

            const {title,desc,price,pic,loc,name,no,cat,email} = req.body;

            const user = await users.findOne({email:email});

            const pRes = await products.insertOne({
                title,
                description: desc,
                price,
                pic,
                location: loc,
                category: cat,
                seller_name: name,
                seller_no: no,
                sellerEmail: email,
                status: "unsold"
            })

            console.log(pRes)

            const tp = user.products;
            tp.push(pRes.insertedId.toString());

            const uRes = await users.updateOne({email:email},{
                $set: {
                    products: tp
                }
            });

            console.log(uRes)

            res.status(200).json({
                success: true,
                message: "Ad posted Successfully"
            })

        } catch (error) {
            console.log("Backend Error");
            console.log(error)
            res.status(500).json({
                success: false,
                error: "Internal Server Error"
            })
        }
    }
}

export default products;
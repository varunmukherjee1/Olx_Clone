import { MongoClient,ObjectId } from "mongodb"

const buyProduct = async (req,res) => {

    if(req.method === "POST"){
        try {

            console.log("Here")

            const client = await MongoClient.connect("mongodb://localhost:27017/olx");
            const db = client.db();
            const products = db.collection("products")
            const users = db.collection("users")

            let {pid,uEmail} = req.body;
            pid = ObjectId(pid);

            const p = await products.findOne({_id:pid})
            const user = await users.findOne({email:uEmail})

            const pres = await products.updateOne({_id:pid},{
                $set: {
                   status: "sold",
                   owner: uEmail
                }
            })

            // console.log(pres)

            let tb = user.bought;
            tb.push(pid.toString())

            const ures = await users.updateOne({email:uEmail},{
                $set: {
                    bought: tb
                }
            })

            // console.log(ures)

            res.status(200).json({
                success: true,
                message: "Product bought successfully"
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Error"
            })
        }
    }
}

export default buyProduct
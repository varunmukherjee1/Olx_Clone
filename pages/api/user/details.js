import { MongoClient,ObjectId } from "mongodb";

const getDetails = async (req,res) => {

    if(req.method === "POST"){
        try {

            const client = await MongoClient.connect(`${process.env.MONGO_URL}`);
            const db = client.db();
            const products = db.collection("products")

            const {myProducts,myBought} = req.body;
            
            // console.log("----------------------> server:");
            // console.log(myProducts)
            // console.log(myBought)


            let sold = []
            let unsold = []
            let bought  = []


            if(myProducts.length > 0){

              for(const pid of myProducts){
                const prd = await products.findOne({_id: ObjectId(pid)})
                // console.log(prd);
            
                if(prd.status === "sold"){
                  sold.push({
                    ...prd,
                    _id: pid
                  });
                }
                else{
                  unsold.push({
                    ...prd,
                    _id: pid
                  });
                }
              }
            }

            if(myBought.length > 0){
              for(const pid of myBought){
                const prd = await products.findOne({_id: ObjectId(pid)})
            
                bought.push({
                  ...prd,
                  _id: pid
                })
              }
            }

            // console.log(sold)
            // console.log(unsold)
            // console.log(bought)

            res.status(200).json({
                success: true,
                sold,
                unsold,
                bought
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    }
}

export default getDetails;
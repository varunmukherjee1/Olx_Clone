import { MongoClient } from "mongodb";

const getProducts = async (req,res) => {
    try {
        
        const client = await MongoClient.connect("mongodb://localhost:27017/olx");

        const productsCollection = await client.db().collection("products");
        const products = await productsCollection.find({});


    } catch (error) {
        console.log("all products error")
        console.log(error)
    }
}

export default getProducts;
import axios from "axios";

export const sampleController = async (req, res) =>{

let data = await axios.get("https://dummyjson.com/products")
console.log("data===>",data.data)
res.json(data.data);

}
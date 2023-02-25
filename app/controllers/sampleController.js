import axios from "axios";

export const sampleController = async (req, res) =>{

let data = await axios.get("https://dummyjson.com/products")
res.json(data.data);

}


export const samplePostController = async (req, res) =>{

    // let data = await axios.get("https://dummyjson.com/products")
    res.json("hi post");
    
    }

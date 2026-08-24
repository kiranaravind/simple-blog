import connectMongo from "@/utils/connectDb";
import postModel from "@/models/postModels";
export async function GET(req){
    try{
        await connectMongo();
        let postData;
        const querry = req.nextUrl.searchParams.get('q');
        if(querry){
            postData = await postModel.find({$or : [{title : {$regex : querry, $options : "i"}},{description : {$regex : querry, $options : "i"}}]});
            return Response.json(postData);
        }
    postData = await postModel.find({});
    return Response.json(postData);
    }catch(error){
        return Response.json({message : error.message});
    }

}
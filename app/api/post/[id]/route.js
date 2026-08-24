import connectMongo from "@/utils/connectDb";
import postModel from "@/models/postModels";
export async function GET(req, { params }) {
    try{
        const { id } = await params;
        await connectMongo();
    const postData = await postModel.find({_id:id});
    return Response.json(postData);
    }catch(error){
        return Response.json({message : error.message});
    }

}
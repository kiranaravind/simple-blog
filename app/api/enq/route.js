import enquiryModel from "@/models/enquiryModel";
import connectMongo from "@/utils/connectDb";
export async function POST(req){
    try{
        const {name , email,message} = await req.json();
        const dat = {name,email,message};
        await connectMongo();
        await enquiryModel.create(dat);
        return Response.json({message : "Enquiry submitted successfully"});
    }catch(error){
        return Response.json({message : error._message});
    }
}

import mongoose, {Schema, model} from "mongoose";

const postSchema = new Schema({
    title : String,
    description : String,
    image : String,
    createdOn : String
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
postSchema.virtual("sd").get(function (){
    return this.description.substr(0,200)+'...';
});
postSchema.virtual("date").get(function(){
    return datfor(this.createdOn);
});
function datfor(d){
    const da = new Date(d);
    const day = da.getDate();
    const month = da.getMonth()+1;
    const year = da.getFullYear();
    return `${day}-${month}-${year}`;
};
const postModel = mongoose.models.Post || model("Post", postSchema);
export default postModel;
import connect from '../../../../db';
import Post from "../../../../models/Post";
import { NextResponse } from 'next/server';
export const DELETE = async (request, { params }) => {
    await connect();
    const id = params.id;
    try {
        const result = await Post.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json(
                { message: `Document with ID: ${id} not found.` },
                { status: 404 }
            );
        }
        return NextResponse.json('record deleted successfully', { status: 200 });
    } catch (error) {
        return NextResponse.json('data not deleted', { status: 500 });
    }
};

export const GET = async (request, { params }) => {

    await connect();
    const id = params.id;
    try {
        const post =await Post.findById(id);
       
        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        return new NextResponse("error in fetching post " + err, { status: 500 });
    }
}

export const PUT = async (req, { params }) => {
    try{
    await connect();
        const id = params.id;
        const data = await req.json();
    const existingPost = await Post.findById(id);
    if (!existingPost) {
        return new NextResponse("Post not found", { status: 404 });
        }
        existingPost.topic = data.topic;
        existingPost.description = data.description;
    await existingPost.save();

    return new NextResponse(JSON.stringify(existingPost), { status: 200 });
  } catch (err) {
    return new NextResponse("Error in updating the post: " + err, { status: 500 });
  }
  
}
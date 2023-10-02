import connect from '../../../db';
import Post from "../../../models/Post";
import { NextResponse } from 'next/server';
export const GET = async (request) => {
  try {
    await connect();
    const posts = await Post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("error in fetching post " + err, { status: 500 });
  }
}
export const POST = async (request) => {
  try {
    await connect();
    const body = await request.json();
    const newPost = new Post(body);
    await newPost.save();
    return new NextResponse(JSON.stringify(newPost), { status: 201 });
  } catch (err) {
    return new NextResponse("Error in creating a new post: " + err, { status: 500 });
  }
}


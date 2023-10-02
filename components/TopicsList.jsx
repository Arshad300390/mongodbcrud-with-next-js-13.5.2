'use client'
import React, { useState, useEffect } from 'react';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';
import axios from 'axios';

export default function TopicsList() {
  const [posts, setPosts] = useState([]);

  // Function to refresh the list of topics
  const refreshTopicsList = () => {
    // Fetch posts when the component mounts
    axios.get('http://localhost:3000/api/posts/')
      .then(function (response) {
        const postsData = response.data;
        setPosts(postsData);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Fetch initial list of topics
    refreshTopicsList();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <>
      {posts.map((post) => (
        <div
          key={post._id} // Assuming each post has a unique ID, replace with the actual key
          className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'
        >
          <div>
            <h2 className='font-bold text-2xl'>{post.topic}</h2>
            <div>{post.description}</div>
          </div>
          <div className='flex gap-2'>
            
            <RemoveBtn postId={post._id} onPostDeleted={refreshTopicsList} /> {/* Pass post ID for dynamic delete */}
            <Link href={`/editTopic/${post._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

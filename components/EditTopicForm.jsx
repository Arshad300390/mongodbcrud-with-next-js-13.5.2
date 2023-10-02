
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
export default function EditTopicForm() {
  const router = useRouter();
  const id = useParams().id;
  const [post, setPost] = useState({});

  const [formData, setFormData] = useState({
    topic: '',
    description: ''
  });

  useEffect(() => {
    const fetchData = async (post) => {
      try {
        // Fetch the post data when the 'id' parameter is available
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`)

        const postData =await response.data;
        console.log('post data', postData);
        setPost(postData);
        setFormData(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    fetchData(post);
  }, [])

  useEffect(() => {
    // This useEffect runs when 'post' changes
    // Update 'formData' when 'post' changes
    setFormData(post);
  }, [post]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(function (response) {
          if (response.status === 200) {
            console.log('Topic updated successfully');
            router.push('/');

          } else {
            console.log('Error updating topic');
          }
        })
    } catch (error) {
      console.log('Error', error);
    }

  }


  return (
    <form key={post.id} className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <input
        className='border border-slate-500 px-8 py-2'
        type='text' name='topic' value={formData.topic}
        placeholder='topic title' onChange={handleChange}
      />
      <input
        className='border border-slate-500 px-8 py-2'
        type='text' name='description' value={formData.description}
        placeholder='topic description' onChange={handleChange}
      />
      <button className='bg-green-600 text-white py-3 px-6 w-fit' type='submit'>
        Update Topic
      </button>
    </form>
  )
}

'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default function AddTopic() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    topic: '',
    description: ''
  });

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
      const res = JSON.stringify(formData);
      console.log('res data is ', res);
      await axios.post('http://localhost:3000/api/posts/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(function (response) {
          console.log('Response:', response);
          if (response.status === 201) {
            console.log('Topic added successfully');
            // You can access the response data using response.data
            console.log('Response Data:', response.data);
            router.push('/');

          } else {
            console.log('Error adding topic');
          }
        })
    } catch (error) {
      console.log('Error', error);
    }

  }
  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
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
        Add Topic
      </button>
    </form>
  );
}

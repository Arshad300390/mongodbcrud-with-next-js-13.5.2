import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { HiOutlineTrash } from 'react-icons/hi';

export default function RemoveBtn({ postId, onPostDeleted }) {
  const router = useRouter();
  const [deleted, setDeleted] = useState(false);
  const id = postId;

  const removePost = async () => {
    const confirmed = window.confirm('Are you sure you want to remove?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/posts/${id}`);
        setDeleted(true);
      } catch (error) {
        console.error('Error removing post:', error);
      }
    }
  };

  useEffect(() => {
    if (deleted) {
      // Trigger the callback function to refresh the topics list
      onPostDeleted();
      router.refresh();
    }
  }, [deleted, router, onPostDeleted]);

  return (
    <button className='text-red-400' onClick={removePost}>
      <HiOutlineTrash size={24} />
    </button>
  );
}

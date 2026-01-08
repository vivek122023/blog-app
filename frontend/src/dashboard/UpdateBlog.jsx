import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BACKEND_URL} from "../utils.js"
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');

  const [blogImage, setBlogImage] = useState(null); // FILE
  const [blogImagePreview, setBlogImagePreview] = useState('/imgPL.webp');

  // IMAGE CHANGE HANDLER

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  // FETCH BLOG DATA

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/blogs/single-blog/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/formData',
          },
        });

        console.log('FETCHED BLOG 👉', data);

        setTitle(data.blog.title);
        setCategory(data.blog.category);
        setAbout(data.blog.about);
        // setBlogImage(data.blog.blogImage.url);
        setBlogImagePreview(data.blog.blogImage?.url || '/imgPL.webp');
      } catch (error) {
        console.log(error);
        toast.error('Failed to load blog');
      }
    };

    fetchBlog();
  }, [id]);

  // UPDATE BLOG

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('about', about);
    //
    if (blogImage instanceof File) {
      formData.append('blogImage', blogImage);
    }
    //
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/blogs/update-blog/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(data);

      // SET CLOUDINARY URL to preview
      if (data?.updatedBlog?.blogImage?.url) {
        setBlogImagePreview(data.updatedBlog.blogImage.url);
        setBlogImage(null); // clear file input
      }
      //

      toast.success(data.message || 'Blog updated successfully');

      navigateTo('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Please fill the required fields');
    }
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <section className="mx-auto max-w-2xl">
          <h3 className="mb-6 text-2xl font-bold">UPDATE BLOG</h3>
          <form>
            <div className="mb-4">
              <label className="mb-2 block font-semibold">Category</label>
              <select
                className="w-full rounded-md border p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="mb-4 w-full rounded-md border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <label className="mb-2 block font-semibold">BLOG IMAGE</label>
              <img
                src={blogImagePreview ? blogImagePreview : blogImage ? blogImage : '/imgPL.webp'}
                alt="Blog Main"
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
              <input
                type="file"
                className="w-full rounded-md border p-2"
                onChange={changePhotoHandler}
              />
            </div>
            <textarea
              rows="6"
              className="mb-4 w-full rounded-md border p-2"
              placeholder="Something about your blog atleast 200 characters!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <button
              className="w-full cursor-pointer rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UpdateBlog;

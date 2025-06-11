import React, { useState } from "react";
import { useCreateBlogMutation } from "../../redux/features/blogs/blogsApi";
import { toast } from "sonner";
import PrimaryButton from "../../utils/PrimaryButton";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../utils/HeaderTitle";

const BlogCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "Technology",
    image: null as File | null,
  });

  const navigate = useNavigate();
  const [createBlog] = useCreateBlogMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload to Cloudinary
      const imageFormData = new FormData();
      imageFormData.append("file", formData.image as Blob);
      imageFormData.append("upload_preset", "Book-sell-shop");
      imageFormData.append("cloud_name", "dvcbclqid");

      const imageResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dvcbclqid/image/upload",
        {
          method: "POST",
          body: imageFormData,
        }
      );

      if (!imageResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imgData = await imageResponse.json();
      const imageUrl = imgData.secure_url;

      const blogData = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        image: imageUrl,
      };

      await createBlog(blogData).unwrap();
      toast.success("Blog posted successfully!");
      navigate("/dashboard/all-blogs");

      // Reset form
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "Technology",
        image: null,
      });
    } catch (error: any) {
      toast.error(error?.message || "Blog creation failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl mt-10 border border-gray-200">
      <h2 className="font-semibold mb-6 text-center">
        <HeaderTitle title="Create a Blog" />
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded p-3"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full border rounded p-3"
          rows={5}
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border rounded p-3"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        >
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Business">Business</option>
        </select>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full border rounded p-3"
          required
        />

        <div>
          <PrimaryButton>post blog</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;

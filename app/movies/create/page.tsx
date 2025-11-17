"use client";

import { useState, useEffect } from "react";
import UploadBox from "../../component/UploadBox";
import { addMovie, updateMovie } from "../../utils/api"; // adjust path
import { useRouter } from "next/navigation";

interface CreateMovieProps {
  addFlg?: boolean;
  editFlg?: boolean;
  imageUrl?: string;
  movie?: any;
  token?: string; 
}

export default function CreateMovie({ addFlg = false, editFlg = false, movie, token }: CreateMovieProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [poster, setPoster] = useState(""); // for preview
  const [posterFile, setPosterFile] = useState<File | null>(null); // actual file

  // Fill form when editing
  useEffect(() => {
    if (movie?.data) {
      setTitle(movie.data.title || "");
      setPublishingYear(movie.data.publishingYear || "");
      setPoster(movie.data.poster || "");
    }
  }, [movie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishingYear", publishingYear);

    if (posterFile) {
      formData.append("poster", posterFile); // send actual file
    }

    try {
      if (editFlg && movie?.data?._id) {
        await updateMovie(movie.data._id, formData, token || "");
        alert("Movie updated successfully");
      } else {
        console.log("Adding movie with token:", formData)
        await addMovie(formData, token || "");
        alert("Movie added successfully");
      }
      router.push("/movieListWrapper");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="px-20 py-6 text-white">
      <h1 className="text-3xl font-bold mb-10">{editFlg ? "Edit" : "Create a new movie"}</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={handleSubmit}>

        {/* Upload Box */}
        <UploadBox
          addFlg={!editFlg}
          editFlg={editFlg}
          imageUrl={poster}
          onFileSelect={(file: File) => {
            setPosterFile(file); // set the actual file for upload
            setPoster(URL.createObjectURL(file)); // update preview
          }}
        />

        {/* Inputs */}
        <div className="space-y-5 max-w-md">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#103543] px-4 py-3 rounded-md"
          />

          <input
            type="text"
            placeholder="Publishing year"
            value={publishingYear}
            onChange={(e) => setPublishingYear(e.target.value)}
            className="w-full bg-[#103543] px-4 py-3 rounded-md"
          />

          <div className="flex gap-4 pt-4">
            <a href="/movieListWrapper" className="px-6 py-2 border border-gray-400 rounded-md">Cancel</a>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 rounded-md font-semibold hover:bg-emerald-600"
            >
              {editFlg ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

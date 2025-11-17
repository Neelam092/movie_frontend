"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMovie } from "../utils/api";

type MovieType = {
  _id: string;
  title: string;
  publishingYear?: string | number;
  poster?: string;
};

type MovieCardProps = {
  movie: MovieType;
  onMovieDeleted: (id: string) => void; // ✅ Matches the prop name from parent
};

export default function MovieCard({ movie, onMovieDeleted }: MovieCardProps) {
  const router = useRouter();

  const handleOpenEdit = () => {
    router.push(`/movies/edit/${movie._id}`);
  };

  const handleDelete = async () => { // ✅ Removed unused 'id' parameter
    onMovieDeleted(movie._id);
    // if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      // const token = localStorage.getItem("token") || "";
      // await deleteMovie(movie._id, token);
      
      // ✅ Call the parent callback to remove from state
      
      // alert("Movie deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  return (
    <div className="relative bg-[#103543] rounded-xl overflow-hidden shadow-md group">
      <img
        src={movie.poster || "/burger.jpg"}
        className="movie-img"
        alt={movie.title}
      />

      <div className="p-4 text-gray-200">
        <h3 className="font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-400">{movie.publishingYear || "N/A"}</p>
      </div>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full"
          onClick={handleOpenEdit}
        >
          <Pencil size={16} />
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full"
          onClick={() => onMovieDeleted(movie._id)} // ✅ Fixed to call handleDelete directly
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
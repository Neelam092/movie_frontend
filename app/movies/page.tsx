
"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import MovieCard from "../component/MovieCard";
import { deleteMovie } from "../utils/api";

type MovieType = {
  _id: string;
  title: string;
  publishingYear?: string | number;
  poster?: string;
};

type MoviesPageProps = {
  movie: MovieType[];
  onMovieDeleted: (id: string) => void; // ✅ Add this prop
};

export default function MoviesPage({ movie, onMovieDeleted }: MoviesPageProps) {
  const router = useRouter();

  // DELETE MOVIE HANDLER
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await deleteMovie(id, token || "");
      alert("Movie deleted successfully!");
      onMovieDeleted(id); // Notify parent about deletion

      router.refresh(); // reloads page data
    } catch (error) {
      console.error(error);
      alert("Delete failed!");
    }
  };

  return (
    <div className="h-screen overflow-y-auto px-10 py-8">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white">My movies</h1>

          <button
            onClick={() => router.push("/movies/create")}
            className="w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <Plus className="text-white border-2 border-white rounded-full" size={20} />
          </button>
        </div>

        <a
          href="/login"
          className="text-sm text-white hover:text-gray-300 flex items-center gap-2"
        >
          Logout
          <ArrowRight className="text-white" size={18} />
        </a>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {movie?.map((m) => (
          <MovieCard
            key={m._id}
            movie={m}
            // Pass down the delete handler
            onMovieDeleted={() => handleDelete(m._id)}
          />
        ))}
        
      </div>
    </div>
  );
}

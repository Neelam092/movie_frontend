"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/app/utils/api";

// Components
import MoviesPage from "@/app/movies/page";
import EmptyList from "@/app/empty/page";

export default function MovieListWrapper() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies(); 
        const movieItems = res?.data?.items || [];
        setMovies(movieItems);
      } catch (error) {
        console.error("Movie list fetch failed", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieDeleted = (deletedId: string) => {
    console.log("Deleted movie ID:", deletedId);
    setMovies((prevMovies) => prevMovies.filter((m) => m._id !== deletedId));
  };

  if (loading) {
    return (
      <div className="text-center text-gray-200 py-10">
        Loading movies...
      </div>
    );
  }

  if (movies.length === 0) {
    return <EmptyList />;
  }

  // ✅ Changed 'movies' to 'movie' to match the prop name
  return <MoviesPage movie={movies} onMovieDeleted={handleMovieDeleted} />;
}
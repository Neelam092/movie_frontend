"use client";

import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CreateMovie from "../../create/page";
// import CreateMovie from "../../create/page";

export default function EditMoviePage() {
  const { id } = useParams(); // ✅ DIRECT access, no Promise

  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`http://localhost:5000/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    }

    if (id) fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-white p-5">Loading...</p>;

  return <CreateMovie editFlg={true} movie={movie} />;
}

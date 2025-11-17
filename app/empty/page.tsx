import Link from "next/link";

// app/login/page.tsx
export default function EmptyList() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden mt-0">
      <div className="">
        <h1 className="text-5xl font-bold text-white mb-10">Your Movie List is Empty</h1>

        <div className="space-y-4 w-[350px] mx-auto">
         

         <Link href="/movies/create">
            <button className="w-full bg-[#1FD07A] text-white font-semibold py-3 rounded-md hover:opacity-90 transition">
              Add a new Movie
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

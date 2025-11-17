const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const login = async (data: any) => {
  const res = await fetch(`http://localhost:5000/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // const token = localStorage.setItem("token", data.data.access_token);
  // console.log("token", token);
  if (!res.ok) throw new Error("Login failed");
  const token  = await res.json();
  console.log("token", token);
  localStorage.setItem("token", token.data.access_token);  
  return token;
};

export const register = async (data: any) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

export const addMovie = async (data: any, token?: string) => {
  try {
    const token_ = localStorage.getItem("token") || token;
    if (!token_) throw new Error("No auth token found");

    // Create FormData
    // const formData = new FormData();
    // if (data.title) formData.append("title", data.title);
    // if (data.publishingYear) formData.append("publishingYear", String(data.publishingYear));
    // if (data.poster) formData.append("poster", data.poster); // File object or URL depending on your setup

    const res = await fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token_}`, // only set auth header
      },
      body: data, // send as FormData
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Add movie failed");
    }

    return res.json();
  } catch (err) {
    console.error("addMovie error:", err);
    throw err;
  }
};


export const updateMovie = async (id: string, data: any, token: string) => {
  const token_ = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token_ || token}`,
    },
    body: data,
  });

  if (!res.ok) throw new Error("Update movie failed");
  return res.json();
};


export const deleteMovie = async (id: string, token: string) => {
  const token_ = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token_ || token}`,
    },
  });

  if (!res.ok) throw new Error("Delete movie failed");

  return res.json();
};



export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
    },
  });
  if (!res.ok) throw new Error("Add movie failed");
  return res.json();
};

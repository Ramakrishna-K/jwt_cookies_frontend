

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5200/api",
//   withCredentials: true, // important for cookies
// });

// export default API;


// import axios from "axios";

// const API = axios.create({
//   // baseURL: "http://localhost:5200/api",
//     baseURL: "https://jwt-and-cookies-backend.onrender.com/api",

//   withCredentials: true, // important for cookies
// });

// // Attach access token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Auto-refresh on 401
// API.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (err.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const res = await API.post("/auth/refresh");
//       localStorage.setItem("accessToken", res.data.accessToken);

//       return API(originalRequest);
//     }

//     return Promise.reject(err);
//   }
// );

// export default API;




import axios from "axios";

const API = axios.create({
  baseURL: "https://jwt-and-cookies-backend.onrender.com/api",
  withCredentials: true, // ✅ cookies auto sent
});

// ✅ Auto-refresh (cookie based)
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await API.post("/auth/refresh"); // 🍪 cookie used
        return API(originalRequest);     // retry original
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default API;

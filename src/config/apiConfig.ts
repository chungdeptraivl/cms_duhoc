import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_VER}`;
const auth_url = `${process.env.NEXT_PUBLIC_AUTH_URL}${process.env.NEXT_PUBLIC_VER}`;

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    TenantId: "02CAEDB6-855B-4430-8234-D0E977E1675D",
  },
});

const auth = axios.create({
  baseURL: auth_url,
  headers: {
    accept: "text/plain",
    "Content-Type": "application/json",
  },
});

const cms = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    accept: "text/plain",
  },
});

cms.interceptors.request.use(
  (config) => {
    const adminData = sessionStorage.getItem("admin");
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        window.location.href = "/sign-in";
        throw new Error("No access token available");
      }
    } else {
      window.location.href = "/sign-in";
      throw new Error("No admin data available");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, auth, cms };

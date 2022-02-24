import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();

  const { data: user, error, revalidate } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status != 409) throw error;
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setStatus(null);
    setErrors([]);

    axios
      .post("/login", props)
      .then(() => revalidate())
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout");

      revalidate();
    }

    window.location.pathname = "/Admin/Auth/login";
  };

  useEffect(() => {
    if (middleware == "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (middleware == "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};

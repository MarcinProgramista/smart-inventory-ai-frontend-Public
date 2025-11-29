// src/components/layout/RouteLoader.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLoader from "../../hooks/useLoader";

export default function RouteLoader() {
  const location = useLocation();
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname, setLoading]);

  return null;
}

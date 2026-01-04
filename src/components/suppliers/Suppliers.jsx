import { useSearchParams } from "react-router-dom";

export default function Suppliers() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Suppliers</h1>
      <p>Suppliers page: {page} 🎉</p>
    </div>
  );
}

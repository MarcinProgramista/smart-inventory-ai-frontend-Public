import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../shared/search/SearchBar";

export default function Suppliers() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <p>
        Suppliers page: {page} 🎉 Search:{debouncedSearch}
      </p>
    </>
  );
}

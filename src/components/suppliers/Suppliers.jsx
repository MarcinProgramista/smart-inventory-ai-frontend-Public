import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../shared/search/SearchBar";
import useFetchSuppliers from "../../hooks/useFetchSuppliers";
import SuppliersList from "./SuppliersList";

export default function Suppliers() {
  const { auth } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 8;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { suppliers, total, loading, fetchSuppliers } = useFetchSuppliers();

  useEffect(() => {
    if (!auth?.id) return;
    fetchSuppliers(auth.id, {
      q: debouncedSearch,
      page,
      limit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.id, debouncedSearch, page, limit]);

  const setPage = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", value);
      return next;
    });
  };

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <SuppliersList
        suppliers={suppliers}
        total={total}
        page={page}
        limit={limit}
        loading={loading}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        onAdd={() => console.log("Add supplier")}
      />
    </>
  );
}

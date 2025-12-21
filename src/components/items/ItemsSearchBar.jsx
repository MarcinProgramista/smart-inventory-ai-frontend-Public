import { Search } from "lucide-react";
import { useRef, useState } from "react";
import {
  Input,
  SearchBox,
  SearchWrapper,
} from "../shared/search/SearchBar.styles";

export default function ItemsSearchBar({ onQueryChange }) {
  const debounceRef = useRef(null);

  const handleChange = (value) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onQueryChange(value);
    }, 300);
  };

  return (
    <Input
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Search inventory..."
    />
  );
}

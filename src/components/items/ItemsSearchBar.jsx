import { Search } from "lucide-react";
import axios from "axios";
import { useRef, useState } from "react";
import API_CONFIG from "../../config/api";
import {
  Input,
  SearchBox,
  SearchWrapper,
} from "../shared/search/SearchBar.styles";

export default function ItemsSearchBar({ onResults }) {
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  const handleSearch = async (value) => {
    setQuery(value);

    try {
      // 🔹 ZAWSZE używamy advanced search
      const res = await axios.get(`${API_CONFIG.BASE_URL}/api/items/search`, {
        params: {
          q: value,
          page: 1,
          limit: 50,
        },
        withCredentials: true,
      });

      onResults(res.data.items);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleChange = (value) => {
    setQuery(value);

    // ❌ kasujemy poprzedni timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // ⏳ ustawiamy nowy
    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  return (
    <SearchWrapper>
      <SearchBox>
        <Search />
        <Input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search inventory..."
          type="text"
        />
      </SearchBox>
    </SearchWrapper>
  );
}

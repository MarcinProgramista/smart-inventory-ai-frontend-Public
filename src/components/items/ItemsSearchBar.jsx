import { Search } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import API_CONFIG from "../../config/api";
import {
  Input,
  SearchBox,
  SearchWrapper,
} from "../shared/search/SearchBar.styles";

export default function ItemsSearchBar({ onResults, userId }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.trim() === "") {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEMS}?user_id=${userId}`
      );
      onResults(res.data);
      return;
    }

    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}${value}`
      );
      onResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <SearchWrapper>
      <SearchBox>
        <Search />
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search inventory..."
          type="text"
        />
      </SearchBox>
    </SearchWrapper>
  );
}

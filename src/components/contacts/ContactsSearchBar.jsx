import axios from "axios";
import { useRef, useState } from "react";
import { Search } from "lucide-react";
import API_CONFIG from "../../config/api";
import {
  Input,
  SearchBox,
  SearchWrapper,
} from "../shared/search/SearchBar.styles";

export default function ContactsSearchBar({ onResults }) {
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  const handleSearch = async (value) => {
    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}/api/contacts/search`,
        {
          params: {
            q: value,
            page: 1,
            limit: 50,
          },
          withCredentials: true,
        }
      );

      onResults(res.data.items);
    } catch (err) {
      console.error("Contacts search error:", err);
    }
  };

  const handleChange = (value) => {
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

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
          placeholder="Search contacts..."
          type="text"
        />
      </SearchBox>
    </SearchWrapper>
  );
}

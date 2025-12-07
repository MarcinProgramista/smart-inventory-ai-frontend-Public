import styled from "styled-components";
import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import API_CONFIG from "../../config/api";

// 💠 Twój design — zachowany 1:1
const SearchWrapper = styled.div`
  margin: 1.5rem 0 2rem 0;
  width: 100%;
  max-width: 480px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;

  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(157, 234, 255, 0.25);
  box-shadow: 0 0 10px rgba(157, 234, 255, 0.25);

  svg {
    stroke: #9deaff;
    width: 20px;
    height: 20px;
  }
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #9deaff;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #9deaff99;
  }
`;

export default function ItemsSearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (value) => {
    setQuery(value);

    // 🔹 Jeśli puste — pobierz wszystkie itemy
    if (value.trim() === "") {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.ITEMS}`
      );
      onResults(res.data);
      return;
    }

    try {
      const res = await axios.get(
        `${API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.SEARCH + value}`
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
          type="text"
          placeholder="Search inventory..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </SearchBox>
    </SearchWrapper>
  );
}

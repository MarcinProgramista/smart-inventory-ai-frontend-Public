import styled from "styled-components";
import { Search } from "lucide-react";
import { useState } from "react";

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

  /* 🔥 Podświetlenie gdy input ma focus */
  &:focus-within {
    border-color: #00c6ff;
    box-shadow: 0 0 18px #00c6ff;
  }
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #9deaff;
  font-size: 1rem;
  outline: none;
  border-radius: 12px;
  height: 40px;
  padding: 12px 13px 12px 12px;

  &::placeholder {
    color: #9deaff99;
  }
`;

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Searching for:", e.target.value);
  };

  return (
    <SearchWrapper>
      <SearchBox>
        <Search />
        <Input
          type="text"
          placeholder="Search inventory..."
          value={query}
          onChange={handleChange}
        />
      </SearchBox>
    </SearchWrapper>
  );
}

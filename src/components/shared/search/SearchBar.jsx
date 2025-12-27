import { Search } from "lucide-react";
import { Input, SearchBox, SearchWrapper } from "./SearchBar.styles";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <SearchWrapper>
      <SearchBox>
        <Search />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type="text"
        />
      </SearchBox>
    </SearchWrapper>
  );
}

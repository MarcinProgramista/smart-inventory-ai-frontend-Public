import { Search } from "lucide-react";
import {
  Input,
  SearchBox,
  SearchWrapper,
} from "../shared/search/SearchBar.styles";

export default function ItemsSearchBar({ value, onChange }) {
  return (
    <SearchWrapper>
      <SearchBox>
        <Search />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search inventory..."
          type="text"
        />
      </SearchBox>
    </SearchWrapper>
  );
}

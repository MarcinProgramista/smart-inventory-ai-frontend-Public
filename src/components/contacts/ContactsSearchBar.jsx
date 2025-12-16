import axios from "axios";
import API_CONFIG from "../../config/api";
import {
  Input,
  SearchBox,
  SearchWrapper,
} from "../shared/search/SearchBar.styles";
import { Search } from "lucide-react";

export default function ContactsSearchBar({ onResult }) {
  const handleSearch = async (value) => {
    try {
      const res = await axios.get(`${API_CONFIG.BASE_URL}/api/contacts`, {
        params: { q: value },
      });
      onResult(res.data);
    } catch (err) {
      console.error("Contacts search error: ", err);
    }
  };
  return (
    <SearchWrapper>
      <SearchBox>
        <Search />
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search contacts ..."
        />
      </SearchBox>
    </SearchWrapper>
  );
}

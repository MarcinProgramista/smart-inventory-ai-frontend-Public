import { ArrowLeft, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NeonButton from "../ui/buttons/NeonButton";

import { Header, ButtonsRow } from "./ItemsHeader.styles";

export default function ItemsHeader({ onAdd }) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h1>Items</h1>
      </Header>

      <ButtonsRow>
        <NeonButton onClick={() => navigate("/home")}>
          <ArrowLeft /> Back
        </NeonButton>

        <NeonButton onClick={onAdd}>
          <PlusCircle /> Add Item
        </NeonButton>
      </ButtonsRow>
    </>
  );
}

import { ArrowLeft, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NeonButton from "../ui/buttons/NeonButton";

import { Header, ButtonsRow } from "./ItemsHeader.styles";
import styled from "styled-components";

const Title = styled.h2`
  color: #9deaff;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const ExportButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #00c6ff;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: #9deaff;
`;
export default function ItemsHeader({ onAdd, onExportCSV, onExportPDF }) {
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
        <NeonButton onClick={onExportCSV}>Export CSV</NeonButton>
        <NeonButton onClick={onExportPDF}>Export PDF</NeonButton>
      </ButtonsRow>
    </>
  );
}

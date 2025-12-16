import { ArrowLeft, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Header, ButtonsRow } from "../header/ListHeader.styes";
import NeonButton from "../../ui/buttons/NeonButton";

export default function ListHeader({
  onAdd,
  onExportCSV,
  onExportPDF,
  heading,
  addTitle,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h1>{heading}</h1>
      </Header>

      <ButtonsRow>
        <NeonButton onClick={() => navigate("/home")}>
          <ArrowLeft /> Back
        </NeonButton>

        <NeonButton onClick={onAdd}>
          <PlusCircle />
          {addTitle}
        </NeonButton>
        <NeonButton onClick={onExportCSV}>Export CSV</NeonButton>
        <NeonButton onClick={onExportPDF}>Export PDF</NeonButton>
      </ButtonsRow>
    </>
  );
}

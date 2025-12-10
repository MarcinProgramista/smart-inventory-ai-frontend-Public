import styled from "styled-components";

/* --- Logout button container --- */
export const LogoutContainer = styled.div`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 5;
`;

/* --- Dashboard wrapper --- */
export const DashboardWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 4rem 2rem 2rem 2rem;
  color: #9deaff;

  height: auto !important;
  min-height: 1500vh !important; /* 💥 wymusza scroll */
`;

export const Welcome = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #9deaff;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const Card = styled.div`
  background: rgba(0, 0, 0, 0.35);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.85;
  color: #9deaff;
`;

export const CardValue = styled.p`
  margin: 0.5rem 0 0;
  font-size: 2rem;
  font-weight: 600;
  color: #9deaff;
`;

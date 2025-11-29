import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.25); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 8px #00d9ff; }
  50% { box-shadow: 0 0 20px #00d9ff; }
  100% { box-shadow: 0 0 8px #00d9ff; }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 10, 20, 0.7);
  z-index: 9999;
`;

const LoaderCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;

  border: 3px solid rgba(0, 217, 255, 0.35);
  border-top-color: #00d9ff;

  animation: spin 1.2s linear infinite, ${glow} 1.5s ease-in-out infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoaderPulse = styled.div`
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 200, 255, 0.25), transparent);

  animation: ${pulse} 2s ease-in-out infinite;
`;

export default function NeonLoader() {
  return (
    <LoaderWrapper>
      <LoaderPulse />
      <LoaderCircle />
    </LoaderWrapper>
  );
}

import styled from "styled-components";

export const PanelContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export const Panel = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

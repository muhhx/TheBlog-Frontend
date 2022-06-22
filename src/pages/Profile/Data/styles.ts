import styled from "styled-components";

export const DataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 400px;
`;

export const DataContainer = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
`;

export const Span = styled.span`
  color: dimgray;
  font-size: 12px;
  text-align: center;
`;

export const SpanButton = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const NumberSpan = styled.span`
  color: #191919;
  font-weight: 600;
`;

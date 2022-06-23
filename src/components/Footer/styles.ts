import styled from "styled-components";

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2px 0px;
  border-top: solid 1px #f4f4f4;
`;

export const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

export const Span = styled.span`
  color: #959595;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
`;

export const NavLink = styled.a`
  color: #1473e6;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

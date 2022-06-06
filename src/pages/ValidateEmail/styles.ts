import styled from "styled-components";
import { Link } from "react-router-dom";

export const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 30px 0px;

  @media only screen and (max-width: 530px) {
    padding: 0px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 530px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 40px 56px;

  @media only screen and (max-width: 530px) {
    border-radius: 0px;
    min-height: 100vh;
    align-items: flex-start;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h1`
  color: #323232;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const Span = styled.span`
  color: #959595;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
`;

export const NavLink = styled(Link)`
  color: #1473e6;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
`;

export const Error = styled.div`
  margin-top: 20px;
  color: #e34850;
  font-size: 12px;
  font-weight: 500;
`;

export const ShortLink = styled(Link)`
  color: #1473e6;
  text-decoration: none;
  font-weight: 400;
  font-size: 12px;
`;

export const ShortContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-top: solid 1px #eaeaea;
  padding-top: 20px;
`;

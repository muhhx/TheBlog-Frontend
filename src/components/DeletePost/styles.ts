import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  backgroundUrl?: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 40px 56px;

  @media only screen and (max-width: 530px) {
    height: 100vh;
    border-radius: 0px;
    padding: 30px 0px;
  }
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  @media only screen and (max-width: 530px) {
    width: 90%;
  }
`;

export const CloseContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const Close = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 25px;
  width: 25px;
  background-image: url(${(props: IProps) => props.backgroundUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% auto;
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

export const Button = styled.button`
  background-color: #cc1b1b;
  height: 32px;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  width: 100%;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #b31818;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const Error = styled.div`
  margin-top: 20px;
  padding: 5px 10px;
  width: 100%;
  color: #f4f4f4;
  background-color: #e34850;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const NavLink = styled(Link)`
  color: #1473e6;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
`;

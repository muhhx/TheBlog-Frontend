import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  image?: string;
  isSelected?: boolean;
}

export const Container = styled.aside`
  height: 100vh;
  width: 100%;
  max-width: 450px;
  background-color: white;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 23px;
  align-items: center;
  width: 100%;
`;

export const Close = styled.div`
  width: 21px;
  height: 21px;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
`;

export const Button = styled.button`
  background-color: #0057ff;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  height: 32px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  width: 100%;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #003ecb;
  }
`;

export const LoginButton = styled.button`
  background-color: #fff;
  border: solid 1px #e8e8e8;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: #191919;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #f1f1f1;
    border-color: #e8e8e8;
  }
`;

export const PageNavigation = styled.button`
  border: none;
  border-left: ${(props: IProps) =>
    props.isSelected ? "solid 3px #323232" : "none"};
  background-color: transparent;
  font-family: inherit;
  font-size: 16px;
  color: #323232;
  font-weight: 600;
  padding-left: ${(props: IProps) => (props.isSelected ? "20px" : "23px")};
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  padding: 23px;
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: inherit;
`;

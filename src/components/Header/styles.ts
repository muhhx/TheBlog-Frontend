import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  image?: string;
  isSelected?: boolean;
}

export const Header = styled.header`
  width: 100%;
  padding: 0px 24px;
  display: flex;
  justify-content: center;
  height: 60px;
  border-bottom: solid 1px #f4f4f4;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
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

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #003ecb;
  }

  @media only screen and (max-width: 530px) {
    display: none;
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
  gap: 10px;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #f1f1f1;
    border-color: #e8e8e8;
  }

  @media only screen and (max-width: 530px) {
    display: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 100%;
`;

export const Profile = styled.div`
  height: 36px;
  aspect-ratio: 1;
  background-color: grey;
  border-radius: 100px;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const Icon = styled.div`
  height: 20px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const PageNavigation = styled.button`
  height: 100%;
  border: none;
  border-bottom: ${(props: IProps) =>
    props.isSelected ? "solid 2px #323232" : "none"};
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  color: #323232;
  font-weight: ${(props: IProps) => (props.isSelected ? "500" : "inherit")};
  padding-top: ${(props: IProps) => (props.isSelected ? "2px" : "none")};
  cursor: pointer;

  @media only screen and (max-width: 530px) {
    display: none;
  }
`;

export const Hamburger = styled.div`
  width: 21px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;

  @media only screen and (min-width: 530px) {
    display: none;
  }
`;

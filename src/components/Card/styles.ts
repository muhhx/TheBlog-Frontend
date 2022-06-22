import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  image: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const Image = styled.div`
  width: 100%;
  min-height: 150px;
  background-color: white;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  position: relative;
`;

export const Fade = styled.div`
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: linear-gradient(transparent, white 80%);
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px 25px;
  height: 100%;
`;

export const Title = styled.h3`
  color: #323232;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
  text-align: justify;
`;

export const Summary = styled.p`
  font-size: 12px;
  color: #323232;
  text-align: justify;
`;

export const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-top: 25px;
`;

export const UserPosts = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;

  @media only screen and (max-width: 380px) {
    flex-direction: column;
  }
`;

export const Read = styled.button`
  background-color: #fff;
  border: solid 1px #e8e8e8;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: #191919;
  font-weight: 600;
  padding: 5px 20px;
  text-align: start;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:hover:enabled {
    background-color: #f1f1f1;
    border-color: #e8e8e8;
  }
`;

export const Edit = styled.button`
  background-color: #cdcdcd;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  display: flex;
  text-align: start;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #bfbfbf;
  }
`;

export const Delete = styled.button`
  background-color: #191919;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  display: flex;
  text-align: start;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: black;
  }
`;

export const Save = styled.button`
  background-color: #191919;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  display: flex;
  text-align: start;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: black;
  }
`;

export const Icon = styled.div`
  height: 10px;
  width: 10px;
  background-image: url(${(props: IProps) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const ReadDivisor = styled.span`
  color: #dfdfdf;
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
  margin-right: 10px;
`;

export const FlexButton = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

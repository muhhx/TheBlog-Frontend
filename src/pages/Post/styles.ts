import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  image: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 0px;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
`;

export const StatusContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const Title = styled.h1`
  color: #323232;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const Summary = styled.h2`
  color: #c3c3c3;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const Image = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: black;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
`;

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Picture = styled.div`
  min-height: 40px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  border-radius: 100px;
`;

export const Name = styled.h3`
  color: #323232;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Information = styled.span`
  color: #323232;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Unauthorized = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(transparent, #f8f8f8 40%);
  position: absolute;
  bottom: 0;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Span = styled.span`
  color: #959595;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: center;
`;

export const NavLink = styled(Link)`
  color: #1473e6;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
`;

export const NameLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: solid 1px #dfdfdf;
  border-bottom: solid 1px #dfdfdf;
  padding: 50px 0px;
`;

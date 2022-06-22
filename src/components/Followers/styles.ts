import styled from "styled-components";

interface IProps {
  image: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 56px;

  @media only screen and (max-width: 530px) {
    border-radius: 0px;
    padding: 30px 0px;
    height: 100vh;
  }
`;

export const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

export const Header = styled.h1`
  color: #323232;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const CloseContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Close = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 25px;
  width: 25px;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% auto;
`;

export const FollowersContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  padding-right: 10px;
  gap: 10px;

  @media only screen and (max-width: 530px) {
    height: auto;
  }
`;

import styled from "styled-components";

interface IProps {
  image: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
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

export const Delete = styled.button`
  background-color: #cc1b1b;
  height: 32px;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  width: 100%;

  &:hover:enabled {
    background-color: #b91b1b;
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
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% auto;
`;

export const Error = styled.div`
  margin-top: 20px;
  padding: 5px 10px;
  color: #f4f4f4;
  background-color: #e34850;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

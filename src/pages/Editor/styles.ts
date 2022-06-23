import styled from "styled-components";

interface IProps {
  image: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 100px;
  padding: 50px 0px;
`;

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Header = styled.h1`
  color: #323232;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const Button = styled.button`
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
  width: 200px;

  &:hover:enabled {
    background-color: #b91b1b;
  }

  @media only screen and (max-width: 535px) {
    width: 100%;
  }
`;

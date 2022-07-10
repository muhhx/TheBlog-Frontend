import styled from "styled-components";

export const PostsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 15px;
  margin: 100px 0px;

  @media only screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 740px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
  height: 400px;
`;

export const Span = styled.span`
  font-size: 12px;
  color: #323232;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #191919;
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
    background-color: black;
  }

  @media only screen and (max-width: 530px) {
    width: 100%;
  }
`;

export const ApiError = styled.div`
  padding: 5px 10px;
  color: #f4f4f4;
  background-color: #e34850;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const Header = styled.div`
  width: 100%;
  margin: 50px 0px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border-bottom: solid 1px #dfdfdf;
`;

export const Subtitle = styled.span`
  font-size: 16px;
  color: #323232;
  text-align: center;
  font-weight: 500;
`;

export const Title = styled.h1`
  color: #323232;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  text-align: center;
`;

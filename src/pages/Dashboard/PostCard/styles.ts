import styled from "styled-components";

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

export const Button = styled.button`
  border: none;
  border-radius: 100px;
  background-color: #2c2c2c;
  height: 32px;
  padding: 5px 20px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 100%;
  max-width: 100px;
`;

export const ButtonArrow = styled.div`
  height: 100%;
  aspect-ratio: 1;
  background-color: #1e1e1e;
  position: absolute;
  right: 0;
  border-radius: 100px;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-repeat: no-repeat;
`;

export const ButtonSpan = styled.span`
  font-family: "Poppins", sans-serif;
  color: white;
  font-weight: 600;
`;

export const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

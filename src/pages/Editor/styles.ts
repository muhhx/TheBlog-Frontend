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
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 60px;
  position: relative;
`;

export const Label = styled.label`
  color: #747474;
  font-size: 10px;
  font-weight: 500;
`;

export const Error = styled.label`
  color: #e34850;
  font-size: 12px;
  font-weight: 500;
  padding-top: 5px;
`;

export const InputHolder = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding-right: 50px;
  border: none;
  outline: none;
  border-bottom: solid 1px #d3d3d3;
  font-size: 14px;
  font-family: inherit;
  color: #323232;
  height: 28px;

  &:focus {
    border-bottom: solid 2px #1473e6;
  }
`;

export const Icon = styled.div`
  position: absolute;
  right: 0px;
  bottom: 6px;
  height: 15px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
`;

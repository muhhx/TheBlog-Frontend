import styled from "styled-components";

interface IProps {
  image: string;
}

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

export const ShowPassword = styled.div`
  position: absolute;
  right: 20px;
  bottom: 6px;
  height: 15px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

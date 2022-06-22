import styled from "styled-components";

interface IProps {
  backgroundUrl?: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  max-height: 100vh;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;

  @media only screen and (max-width: 530px) {
    height: 100vh;
    border-radius: 0px;
  }
`;

export const Form = styled.form`
  width: 90%;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
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

export const Error = styled.label`
  color: #e34850;
  font-size: 12px;
  font-weight: 500;
  padding-top: 5px;
`;

export const Icon = styled.div`
  position: absolute;
  right: 0px;
  bottom: 6px;
  height: 15px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
`;

export const ImagePreview = styled.div`
  width: 100%;
  height: 350px;
  background-color: #f8f8f8;
  background-image: url(${(props: IProps) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
  border-radius: 10px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const Button = styled.button`
  background-color: #1473e6;
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
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #0d66d0;
  }
`;

export const Header = styled.h1`
  color: #323232;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
  word-break: break-all;
`;

export const Subtitle = styled.h2`
  color: #727272;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0;
  word-break: break-all;
`;

export const ApiError = styled.div`
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
  background-image: url(${(props: IProps) => props.backgroundUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% auto;
`;

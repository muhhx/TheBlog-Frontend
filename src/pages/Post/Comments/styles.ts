import styled from "styled-components";

interface IProps {
  image: string;
}

export const Title = styled.h1`
  padding-bottom: 50px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 30px 40px;

  @media only screen and (max-width: 400px) {
    padding: 30px 10px;
  }
`;

export const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 20px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 50px;
  margin-bottom: 50px;
  border-bottom: solid 1px #dfdfdf;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Profile = styled.div`
  min-height: 50px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  background-color: black;
  border-radius: 100px;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border: solid 1px #dfdfdf;
  border-radius: 2px;
  outline: none;
  resize: vertical;
  padding: 10px;
  font-family: inherit;
  font-size: 12px;
  color: #323232;
  font-weight: 500;
`;

export const Button = styled.button`
  background-color: #fff;
  border: solid 1px #e8e8e8;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: #191919;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #f1f1f1;
    border-color: #e8e8e8;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const Span = styled.span`
  font-size: 12px;
  color: #c5c5c5;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`;

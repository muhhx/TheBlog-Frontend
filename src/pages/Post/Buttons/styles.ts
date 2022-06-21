import styled from "styled-components";

interface IProps {
  image: string;
}

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 530px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const Save = styled.button`
  background-color: #0057ff;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  display: flex;
  text-align: start;
  align-items: center;
  min-width: 135px;
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #003ecb;
  }

  @media only screen and (max-width: 530px) {
    width: 100%;
  }
`;

export const Upvote = styled.button`
  background-color: #fff;
  border: solid 1px #e8e8e8;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: #191919;
  font-weight: 600;
  padding: 5px 20px;
  text-align: start;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #f1f1f1;
    border-color: #e8e8e8;
  }

  @media only screen and (max-width: 530px) {
    width: 100%;
  }
`;

export const Icon = styled.div`
  height: 10px;
  width: 10px;
  background-image: url(${(props: IProps) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const UpvoteDivisor = styled.span`
  color: #dfdfdf;
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
  margin-right: 10px;
`;

export const SaveDivisor = styled.span`
  color: #ffffff38;
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
  margin-right: 10px;
`;

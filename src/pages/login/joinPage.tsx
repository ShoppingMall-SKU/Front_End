import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import kakaoLogo from '../../assets/kakaoLogo.png'
import googleLogo from '../../assets/googleLogo.png';

// Main Component
const JoinPage = (): JSX.Element => {
  const navigate = useNavigate();

  // 일반 회원가입 페이지 이동
  const handleGeneralJoin = () => {
    navigate('/join/general'); 
  };

  const handleKakaoLogin = () => {
    alert('카카오 로그인 연동');
  };

  const handleGoogleLogin = () => {
    alert('구글 로그인 연동');
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <ButtonGroup>
        <Button bgColor="#FF5D5D" onClick={handleGeneralJoin}>
          일반회원가입
        </Button>
        <Divider>SNS 간편회원가입</Divider>
        <Button bgColor="#FEE500" onClick={handleKakaoLogin}>
          <img src={kakaoLogo} alt="카카오 로고" />
          카카오계정으로 회원가입
        </Button>
        <Button bgColor="#F2F2F2" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="구글 로고" />
          구글계정으로 회원가입
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default JoinPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  margin: 5rem;
`;

const Title = styled.h1`
  margin-top: 3rem;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
  padding: 30px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
  border-radius: 10px;
`;

const Button = styled.button<{ bgColor: string; border?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => (props.bgColor === '#FF5D5D' ? 'white' : 'black')};
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.bgColor};
    filter: brightness(0.95);
  }
  img {
    width: 20px;
    height: 20px;
  }
`;



const Divider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    font-size: 1.3rem;
    font-weight: bold;
    color: black;
    position: relative;

    &::before, &::after {
        content: '';
        position: absolute;
        width: 30%;   // 선의 길이
        border-top: 1.5px solid #898989; // 선의 스타일
        top: 50%; // 중앙에 배치
    }

    // 왼쪽 선
    &::before {
        left: 0;
    }

    // 오른쪽 선
    &::after {
        right: 0;
    }

    // 텍스트 가운데 정렬
    & > span {
        padding: 0 10px; // 텍스트와 선 사이의 간격
    }
`;
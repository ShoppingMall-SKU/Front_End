import styled from 'styled-components'
import kakaoLogo from '../../assets/kakaoLogo.png'
import googleLogo from '../../assets/googleLogo.png'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSocialLogin: (platform: string) => void;
}

const AccountMergeModal : React.FC<ModalProps> = ({isOpen, onClose, onSocialLogin}) => {
    if(!isOpen) return null;

    return(
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Title>소셜 로그인 계정 통합으로 간편하게 로그인하세요</Title>
                <ButtonGroup>
                    <Button bgColor="#FEE500" onClick={() => onSocialLogin('kakao')}>
                        <img src={kakaoLogo} alt="카카오 로고" />
                        카카오계정으로 시작하기
                    </Button>
                    <Button bgColor="#F2F2F2" onClick={() => onSocialLogin('google')}>
                        <img src={googleLogo} alt="구글 로고" />
                        구글계정으로 시작하기
                    </Button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>

    );
};

export default AccountMergeModal;


const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%
  max-width: 700px;
  text-align: center;
  box-sizing: border-box;
`;

const Title = styled.h1`
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    padding: 10px;
`;
const ButtonGroup = styled.div`
  margin-top: 1rem;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
`;

const Button = styled.button<{ bgColor: string; border?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => props.bgColor};
  color: black;
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
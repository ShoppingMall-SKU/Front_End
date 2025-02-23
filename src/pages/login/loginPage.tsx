import { useState } from "react";
import styled from "styled-components"

import kakaoLogo from "../../assets/kakaoLogo.png"
import googleLogo from "../../assets/googleLogo.png"

const LoginPage = () => {
    // Member or Not
    const [isMemberView, setIsMemberView] = useState(true);
    // Client or Seller
    const [userType, setUserType] = useState<'client' | 'seller'>('client');
    // remember ID
    const [rememberId, setRememberId] = useState(false);
    // auto Login
    const [autoLogin, setAutoLogin] = useState(false);

    // 로그인 확인
    // const [id, setId] = useState("");
    // const [password, setPassword] = useState("");

    // 주문조회 확인
    // const [orderName, setOrderName] = useState("");
    // const [orderNumber, setOrderNumber] = useState("");
    //const [orderPhoneNumber, setOrderPhoneNumber] = useState("");

    const toggleRememberId = () => setRememberId(!rememberId);
    const toggleAutoLogin = () => setAutoLogin(!autoLogin);

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // 서버로 데이터 제출
    //     console.log("로그인 데이터 제출");
    // };

    return(

        <Container>
            <Header>
                <TabButton selected={isMemberView} onClick={() => setIsMemberView(true)}>로그인</TabButton>
                <TabButton selected={!isMemberView} onClick={() => setIsMemberView(false)}>비회원 주문조회</TabButton>
            </Header>
            <InnerContainer>
                { isMemberView ? (
                    <>
                        <UserTypeSelector>
                            <TypeButton selected={userType === 'client'} onClick={() => setUserType('client')}>개인회원</TypeButton>
                            <TypeButton selected={userType === 'seller'} onClick={() => setUserType('seller')}>판매자</TypeButton>
                        </UserTypeSelector>
                            <InputGroup>
                                <Label htmlFor="id">아이디</Label>
                                <Input id="id" placeholder="아이디를 입력하세요" />
                            </InputGroup>
                            <InputGroup>
                                <Label htmlFor="password">비밀번호</Label>
                                <Input id="password" type = "password" placeholder="비밀번호를 입력하세요" />
                            </InputGroup>
                            <ButtonGroup>
                                <Button bgColor="#FF5D5D">로그인</Button>
                            </ButtonGroup>
                            <HorizontalGroup>
                                <CheckboxGroup>
                                    <Label>
                                        <StyledCheckbox checked={rememberId} onChange={toggleRememberId} />
                                        아이디 저장
                                    </Label>
                                    <Label>
                                        <StyledCheckbox checked={autoLogin} onChange={toggleAutoLogin} />
                                        자동 로그인
                                    </Label>
                                </CheckboxGroup>
                                <LinkGroup>
                                    <LinkButton>아이디 찾기</LinkButton>
                                    <LinkButton>비밀번호 찾기</LinkButton>
                                </LinkGroup>
                            </HorizontalGroup>
                            {userType === 'client' && (
                                <ButtonGroup>
                                    <Button bgColor="#FEE500">
                                        <Icon src={kakaoLogo} alt="카카오 로고" />
                                        카카오계정으로 로그인</Button>
                                    <Button bgColor="#F2F2F2">
                                        <Icon src={googleLogo} alt="구글 로고" />
                                        구글계정으로 로그인</Button>
                                    <Button bgColor="FFFFFF">회원가입</Button>
                                </ButtonGroup>
                            )}
                                
                        
                    </>
                ) : (
                    <Form>
                        <Label>주문자명</Label>
                        <Input placeholder="주문자명을 입력하세요" />
                        <Label>주문번호</Label>
                        <Input placeholder="주문번호를 입력하세요" />
                        <Label>휴대전화번호</Label>
                        <Input placeholder="휴대전화번호를 입력하세요" />
                        <ButtonGroup>
                            <Button bgColor="#FF5D5D">주문조회</Button>
                        </ButtonGroup>
                    </Form>
                )}
                

            </InnerContainer>
        </Container>
    )
};

export default LoginPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    background-color: #f8f8f8;
    margin: 5rem;
    padding: 2rem 5rem 5rem 5rem;
`;

const Header = styled.div`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;

`;

const TabButton = styled.button<{selected: boolean}>`
    border: none;
    background: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({selected}) => (selected ? 'black' : '#999999')};
    cursor: pointer;
    padding: 0.5rem 1rem;
    &:hover {
        color: ${({selected}) => (selected ? 'black' : '#666666')};  
    }
`;

const InnerContainer = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 30px;
    margin-top: 1.5rem;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
`;


const UserTypeSelector = styled.div`
    display: flex;
    margin-bottom: 1rem;
`;

const TypeButton = styled.button<{selected: boolean}>`
    padding: 0.5rem;
    border: none;
    background: none;
    font-size: 1.3rem;
    font-weight: bold;
    color: ${({selected}) => (selected ? 'black' : '#999999')};
    cursor: pointer;
`;

const Form = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;

const Label = styled.label`
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    margin-top: 1rem;
    color: 'black';
    align-items: center;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
`;

const Input = styled.input`
    padding: 0.8rem;
    font-size: 0.8rem;
    border: 1px solid #bbbbbb;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    &::placeholder {
        color: #bbbbbb;  // 원하는 색상
    }
`;

const HorizontalGroup = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin-top: 0.5rem; 
`;


const CheckboxGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: #999999;
    gap: 0.5rem;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1.5px solid #999;
    border-radius: 4px;
    background-color: white;
    display: inline-block;
    cursor: pointer;
    margin-right: 5px;
    &:checked {
        background-color: #FF5D5D;
        border-color: #FF5D5D;
    }
  
    &:checked::before {
        content: '✓';
        color: white;
        font-size: 16px;
        display: block;
        text-align: center;
        line-height: 18px;
    }
`;

const LinkGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    gap: 0.5rem;
`;

const LinkButton = styled.button`
    background: none;
    border: none;
    color: black;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
        text-decoration: underline;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 400px;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 15px;
`;


const Button = styled.button<{ bgColor: string; border?: boolean }>`
    width: 100%;
    background-color: ${(props) => props.bgColor};  // bgColor 적용
    color: ${(props) => (props.bgColor === '#FF5D5D' ? 'white' : 'black')};  // 배경색이 #FF5D5D일 때만 흰색 텍스트
    padding: 1rem;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: ${(props) => props.bgColor};
        filter: brightness(0.95); 
    }
`;
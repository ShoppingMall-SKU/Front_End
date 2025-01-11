import { useState } from "react";
import styled from "styled-components";
 
const JoinFormPage = () : JSX.Element => {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        username: '',
        email: '',
        address: '',
        detailedAddress: '',
        zipcode: '',
        phone: '',
    });

    const handelAddressSearch = () => {
        alert('카카오 주소찾기');
    };

    const handleSubmitJoin = () => {
        alert('회원가입');

    };

    return (
        <Container>
            <Title>회원가입</Title>
            <Form>
                <InputGroup>
                    <Label>아이디</Label>
                    <Input type="text" name="id" placeholder="아이디를 입력하세요"></Input>
                </InputGroup>
                <InputGroup>
                    <Label>비밀번호</Label>
                    <Input type="text" name="password" placeholder="비밀번호(8-16자의 영어/숫자/특수문자)"></Input>
                </InputGroup>
                <InputGroup>
                    <Label>비밀번호확인</Label>
                    <Input type="text" name="confirmPassword" placeholder="비밀번호를 입력하세요"></Input>
                </InputGroup>
                <InputGroup>
                    <Label>이름</Label>
                    <Input type="text" name="username" placeholder="이름을 입력하세요"></Input>
                </InputGroup>
                <InputGroup>
                    <Label>휴대전화번호</Label>
                    <Input type="text" name="phone" placeholder="휴대전화번호를 입력하세요"></Input>
                </InputGroup>
                <InputGroup>
                    <Label>이메일</Label>
                    <Input type="text" name="email" placeholder="이메일을 입력하세요"></Input>
                </InputGroup>
                <InputGroup>
                    <Label>주소</Label>
                    <AddressGroup>
                        <Input type="text" name="zipcode" placeholder="우편번호" readOnly></Input>
                        <AddressButton type="button" onClick={handelAddressSearch}>주소검색</AddressButton>
                    </AddressGroup>
                    <Input type="text" name="address" placeholder="주소를 입력하세요" readOnly></Input>
                    <Input type="text" name="detailedAddress" placeholder="상세주소를 입력하세요"></Input>
                </InputGroup>
                <ButtonGroup>
                    <Button type="submit" bgColor="#FF5D5D" onClick={handleSubmitJoin}>가입하기</Button>
                </ButtonGroup>  
            </Form>
        </Container>
    )
};

export default JoinFormPage;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    background-color: #f8f8f8;
    margin: 3rem;
    padding: 2rem 5rem 5rem 5rem;
`;

const Title = styled.h1`
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    width: 100%;
    max-width: 500px;
    padding: 30px;
    margin-top: 1.5rem;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
`;

const Label = styled.label`
    align-items: center;
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
    color: 'black';
    font-size: 0.9rem;
`;


const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
`;

const Input = styled.input`
    padding: 0.8rem;
    font-size: 0.8rem;
    border: 1px solid #bbbbbb;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    max-height: 40px;
    &::placeholder {
        color: #bbbbbb;  // 원하는 색상
    }
`;

const AddressGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AddressButton = styled.button`
  padding: 0.5rem;
  font-size: 0.9rem;
  max-height: 40px;
  color: white;
  background-color: #bbbbbb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #357ae8;
  }
`;

const ButtonGroup = styled.div`
    margin-top: 2rem;
    padding: 50px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 10px;
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

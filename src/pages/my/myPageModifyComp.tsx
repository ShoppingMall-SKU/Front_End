import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountMergeModal from './accountMergeModal';


const MyPageModifyComp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      id: 'testerUser',
      password: '',
      confirmPassword: '',
      username: 'hello',
      phone: '010-1234-5678',
      email: 'mealkart@gmail.com',
      address: '서울시 ㅇㅇ구 ㅇㅇ로',
      detailedAddress: '101동 1005호',
      zipcode: '12345'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handelAddressSearch = () => {
    alert('카카오 주소찾기');
  };  

  const handleUpdate = () => { // 정보 업데이트
    alert('회원정보가 변경되었습니다');
    console.log(formData);
  };

  const handleCancel = () => { // 취소시 메인화면으로 이동
    navigate('/');
  };

  const handleAccountMerge = () => { 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSocialLogin = () => {
    alert('계정통합');
    setIsModalOpen(false);
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return(
    <Container>
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>기본정보</TableHeader>
          </TableRow>
          <TableRow>
            <TableHeader>아이디</TableHeader>
            <TableData>
              <Input value={formData.id} disabled />
            </TableData>
          </TableRow>
          <TableRow>
            <TableHeader>비밀번호</TableHeader>
            <TableData>
              <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </TableData>
          </TableRow>
          <TableRow>
            <TableHeader>비밀번호 확인</TableHeader>
            <TableData>
              <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
            </TableData>
          </TableRow>
          <TableRow>
            <TableHeader>이름</TableHeader>
            <TableData>
              <Input name="name" value={formData.username} onChange={handleInputChange} />
            </TableData>
          </TableRow>
          <TableRow>
            <TableHeader>주소</TableHeader>
            <TableData>
              <AddressRow>
                <Input name="zipcode" className='short' placeholder="우편번호" value={formData.zipcode} onChange={handleInputChange} readOnly/>
                <AddressButton type="button" onClick={handelAddressSearch}>주소검색</AddressButton>
              </AddressRow>
              <Input name="address" className='long' placeholder="일반 주소" value={formData.address} onChange={handleInputChange} readOnly/>
              <Input name="detailedAddress" className='long' placeholder="상세 주소" value={formData.detailedAddress} onChange={handleInputChange} />
            </TableData>
          </TableRow>
          <TableRow>
            <TableHeader>휴대전화</TableHeader>
            <TableData>
              <Input name="phone" value={formData.phone} onChange={handleInputChange} />
            </TableData>
          </TableRow>
          <TableRow>
            <TableHeader>이메일</TableHeader>
            <TableData>
              <Input name="email" value={formData.email} onChange={handleInputChange} />
            </TableData>
          </TableRow>
        </tbody>
      </Table>
      <ButtonGroup>
        <ButtonWrapper>
          <Button className="primary" onClick={handleUpdate}>회원정보수정</Button>
          <Button className="secondary" onClick={handleCancel}>취소</Button>
        </ButtonWrapper>
        <Button className="secondary" onClick={handleAccountMerge}>계정통합</Button>
      </ButtonGroup>
      <AccountMergeModal isOpen={isModalOpen} onClose={closeModal} onSocialLogin={onSocialLogin}/>
          </Container> 
  );
};

export default MyPageModifyComp;


const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0.5rem 2rem 2rem 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 4rem;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  width: 30%;
`;

const TableData = styled.td`
  padding: 8px;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center; 
  gap: 10px;
  margin-bottom: 8px;
`;

const AddressButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  margin-left: 8px;
  background-color: #bbbbbb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex-shrink: 0; 
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
  text-align: center;

  &.primary {
    background-color: black;
    color: white;
  }

  &.secondary {
    background-color: white;
    color: black;
    border: 1px solid #ddd;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가운데 배치 */
  gap: 16px;
  width: 100%;
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;

  &.short {
    width: 120px; 
  }

  &.long {
    width: 400px;
    margin-bottom: 8px; 
  }
`;


import React from "react";
import ClientSidebar from "../../components/clientSidebar";
import MyPageModifyComp from "./myPageModifyComp";
import styled from 'styled-components';

const MyModify = () => {
    return(
        <Container>
            <ClientSidebar/>     
                <Content>
                    <Title>회원 정보 수정</Title>
                    <MyPageModifyComp />
                </Content>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    height: 100vh;
    margin-bottom: 5rem;
`;

const Content = styled.div`
    flex-grow: 1;
    padding: 10px;
`;

const Title = styled.h1`
    margin-top: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
`;

export default MyModify;
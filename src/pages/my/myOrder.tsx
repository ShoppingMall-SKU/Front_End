import React from "react";
import ClientSidebar from "../../components/clientSidebar";
import styled from 'styled-components';
import MyPageOrderStatus from "./myPageOrderStatus";
import MyOrderList from "./myOrderList";

const MyOrder = () => {
    return(
        <Container>
            <ClientSidebar />
            <Content >
                <Title>주문내역조회</Title>
                <SubTitle>최근 3개월 기준</SubTitle>
                <MyPageOrderStatus />
                <MyOrderList />
            </Content>
        </Container>
    );
};

export default MyOrder;

const Container = styled.div`
    display: flex;
    min-height: calc(100vh - 80px); 
    padding-bottom: 80px; 
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

const SubTitle = styled.h2`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
`
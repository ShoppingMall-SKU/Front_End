import React, { useState } from "react";
import styled from "styled-components";
import ClientSidebar from "../../components/clientSidebar";
import { useNavigate } from "react-router-dom";

// 본인이 문의한 문의사항에 대해서만 나오도록



interface Inquiry {
    index: number;
    productName: string;
    title: string;
    type: string;
    date: string;
    status: "답변완료" | "미답변";
}


const Inquiries: Inquiry[] = [
    {index: 1, productName: "제품1", title: "배송문의입니다", type: "배송문의", date: "2025.3.1", status:"답변완료" },
    {index: 2, productName: "제품3", title: "상품문의입니다", type: "상품문의", date: "2025.3.3", status:"미답변" },
    {index: 3, productName: "제품5", title: "상품문의입니다", type: "상품문의", date: "2025.3.4", status:"미답변" },
    {index: 4, productName: "제품10", title: "상품문의입니다", type: "상품문의", date: "2025.3.5", status:"미답변" },
    {index: 5, productName: "제품11", title: "상품문의입니다", type: "상품문의", date: "2025.3.6", status:"미답변" }
];

const MyInquiry = () => {

    const [inquiries] = useState<Inquiry[]>([...Inquiries].sort((a,b) => b.index- a.index));
    const navigate = useNavigate();

    const handleRowClick = (index: number) => {
        navigate(`/inquiry/${index}`);
    };

    return(
        <Container>
            <ClientSidebar />
            <Content>
                <Title>문의사항</Title>
                <ListContainer>


                <Table>
                    <thead>
                        <tr>
                            <Th>번호</Th>
                            <Th>상품명</Th>
                            <Th>제목</Th>
                            <Th>문의유형</Th>
                            <Th>작성일</Th>
                            <Th>답변상태</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inquiry) => (
                            <Tr key={inquiry.index} onClick={() => handleRowClick(inquiry.index)}>
                                <Td>{inquiry.index}</Td>
                                <Td>{inquiry.productName}</Td>
                                <Td className="title">{inquiry.title}</Td>
                                <Td>{inquiry.type}</Td>
                                <Td>{inquiry.date}</Td>
                                <Td>
                                    <StatusBadge status={inquiry.status}>{inquiry.status}</StatusBadge>
                                </Td>
                                </Tr>

                        ))}
                    </tbody>
                </Table>
                </ListContainer>
            </Content>
        </Container>
        
    );
};

export default MyInquiry;


const Container = styled.div`
    display: flex;
    min-height: calc(100vh - 80px); 
`;

const Content = styled.div`
    flex: 1;  
    didplay: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    margin: 1rem;
    
`;

const Title = styled.h1`
    margin-top: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
`;


const ListContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: auto;
`
const Table = styled.table`
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    margin: auto;
`;

const Th = styled.th`
    padding: 12px;
    font-weight: bold;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
`;

const Tr = styled.tr`
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
    padding: 12px;
`;

const StatusBadge = styled.span<{ status: "답변완료" | "미답변" }>`
    background-color: ${({ status }) => (status === "답변완료" ? "#bbb" : "#555")};
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    color: #fff;
    display: inline-block;
    min-width: 80px;
    text-align: center;
`;
import styled from 'styled-components';
import { Order } from './myOrderList';
interface OrderStatus {
    status: string;
    count: number;
}

const statuses: OrderStatus [] = [
    {status: '입금대기', count: 0},
    {status: '입금확인', count: 0},
    {status: '배송준비중', count: 0},
    {status: '배송중', count: 0},
    {status: '배송완료', count: 0}

];

const MyPageOrderStatus = () => {
    return(
        <StatusContainer>
            {statuses.map(({status, count}) => (
                <StatusItem key={status}>
                    <StatusLabel>{status}</StatusLabel>
                    <StatusCount>{count}</StatusCount>
                </StatusItem>
            ))}
        </StatusContainer>
    );
};

export default MyPageOrderStatus;

const StatusContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    margin-top: 1rem;
    padding: 2rem;
`;

const StatusItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`;

const StatusCount = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

const StatusLabel = styled.div`
  font-size: 1rem;
`;


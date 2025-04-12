import styled from "styled-components";
import { useMemo } from "react";
import { Order } from "./myOrderList";

// 임시 데이터
import { initialOrders } from "../../data/orderData";
import { addMonths, isWithinInterval } from "date-fns";
interface OrderStatus {
  status: string;
  count: number;
}

const STATUSES = ["입금대기", "입금확인", "배송준비중", "배송중", "배송완료"];

const MyPageOrderStatus = () => {
  const filteredOrders = useMemo(() => {
    const now = new Date();
    const threeMonths = addMonths(now, -3);
    return initialOrders.filter((order) =>
      isWithinInterval(new Date(order.date), {
        start: threeMonths,
        end: now,
      })
    );
  }, []);

  const statusCounts: OrderStatus[] = STATUSES.map((status) => ({
    status,
    count: filteredOrders.filter((order) => order.status === status).length,
  }));
  return (
    <StatusContainer>
      {statusCounts.map(({ status, count }) => (
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

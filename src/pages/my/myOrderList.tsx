import React, {useState} from 'react';
import DatePicker, {DatePickerProps} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, isWithinInterval, parse } from "date-fns";
import styled from 'styled-components'

import CancelRefundModal from './cancelRefundModal';
import ReviewCreateModal from './reviewCreateModal';

export interface Order {
    date: string;
    ordernumber: string;
    brand: string;
    productname: string;
    quantity: number;
    price: number;
    status: string; // 주문상태
    refundStatus?: string; // 취소/환불 여부
    isPurchased: boolean; // 구매확정 여부
    isRefundRequested? : boolean; // 취소/환불 요청
    refundReason? : string;
    refundDetails?: string;
  }

const MyOrderList: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'orders' | 'refunds'>('orders');
    const [selectedStatus, setSelectedStatus] = useState<string>('전체'); 
    const [selectedPeriod, setSelectedPeriod] = useState<string>('3개월');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    // cancel refund
    const [isCancelRefundModalOpen, setCancelRefundModalOpen] = useState<boolean>(false);
    // review
    const [isReviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
    // confirm purchas
    const [isConfirmPurchasModalOpen, setConfirmPurchaseModalOpen] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [orders, setOrders] =  useState<Order[]>([
        { date: '2024-12-12', ordernumber: '12345678', brand: '브랜드1', productname: '엽기떡볶이', quantity: 1, price: 11900, status: '입금확인', refundStatus: undefined, isPurchased: false},
        { date: '2024-08-04', ordernumber: '87654321', brand: '브랜드2', productname: '까르보나라', quantity: 2, price: 23900, status: '배송준비중', refundStatus: undefined, isPurchased: false },
        { date: '2024-06-15', ordernumber: '98765432', brand: '브랜드3', productname: '부대찌개', quantity: 1, price: 15900, status: '배송중', refundStatus: undefined, isPurchased:false },
        { date: '2024-3-20', ordernumber: '54321678', brand: '브랜드4', productname: '짬뽕', quantity: 1, price: 9900, status: '배송완료', refundStatus: undefined, isPurchased: false },
        { date: '2024-2-18', ordernumber: '13572468', brand: '브랜드5', productname: '크림새우', quantity: 2, price: 17800, status: '배송완료', refundStatus: undefined, isPurchased: false }
  
      ]);

      const filteredOrders = orders.filter(order => {
        const statusFilter = selectedStatus === '전체' || order.status === selectedStatus;
        let dateFilter = true;

        if (selectedPeriod !== '전체') {
            const currentDate = new Date();
            let startDateForPeriod: Date | undefined;
            if (selectedPeriod === '3개월') {
                startDateForPeriod = addMonths(currentDate, -3);
            } else if (selectedPeriod === '6개월') {
                startDateForPeriod = addMonths(currentDate, -6);
            } else if (selectedPeriod === '1년') {
                startDateForPeriod = addMonths(currentDate, -12);
            }
            if (startDateForPeriod) {
                dateFilter = isWithinInterval(new Date(order.date), { start: startDateForPeriod, end: currentDate });
            }
        } else {
            dateFilter = true;
        }

        if (startDate && endDate) {
            const orderDate = parse(order.date, 'yyyy-MM-dd', new Date());
            dateFilter = isWithinInterval(orderDate, { start: startDate, end: endDate });
        }

        return statusFilter && dateFilter;
    })
    .filter(order => selectedTab === 'orders' ? !['취소중', '취소완료'].includes(order.status) : ['취소중', '취소완료'].includes(order.status))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    ;

    // 취소/환불 
    const handleCancelRefund = (order: Order) => {
            setSelectedOrder(order);
            setCancelRefundModalOpen(true);
    };

    const handleCancelRefundSubmit = (reason: string, details: string) => {
        if (selectedOrder) {
            setOrders((prevOrders) =>
                prevOrders.map(order =>
                    order.ordernumber === selectedOrder.ordernumber
                    ? {
                            ...order, 
                            isRefundRequested: true, 
                            status: '취소중', 
                            refundReason: reason,
                            refundDetails: details
                        }
                    : order
                    ));
        }
        setCancelRefundModalOpen(false);
    };

    // 리뷰작성
    const handleReview = (order: Order) => {
        setSelectedOrder(order);
        setReviewModalOpen(true);
    };

    const handleReviewSubmit = () => {
        setReviewModalOpen(false);
    }

    // 구매확정
    const handleConfirmPurchase = (order: Order) => {
        setSelectedOrder(order);
        setConfirmPurchaseModalOpen(true);
    };

    const confirmPurchase = () => {
        if (selectedOrder) {
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.ordernumber === selectedOrder.ordernumber 
                    ? { ...order, isPurchased: true } 
                    : order
                )
            );
            setConfirmPurchaseModalOpen(false);
        }
    };


    return(
        <Container>
            <Title>주문조회</Title>
            <TabContiner>
                <TabButton 
                    selected={selectedTab === 'orders'}
                    onClick={() => setSelectedTab('orders')}>
                    주문내역조회
                </TabButton>
                <TabButton
                    selected={selectedTab === 'refunds'}
                    onClick={() => setSelectedTab('refunds')}>
                    취소/환불 내역
                </TabButton>
            </TabContiner>

            {/* 주문내역조회 */}
            {selectedTab === 'orders' && (
                <>
                    <FilterContainer>
                        <StatusSelect value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="입금대기">입금대기</option>
                            <option value="입금확인">입금확인</option>
                            <option value="배송준비중">배송준비중</option>
                            <option value="배송중">배송중</option>
                            <option value="배송완료">배송완료</option>
                        </StatusSelect>
                        <PeriodButtonGroup>
                            <PeriodButton onClick={() => setSelectedPeriod('3개월')} selected={selectedPeriod === '3개월'}>3개월</PeriodButton>
                            <PeriodButton onClick={() => setSelectedPeriod('6개월')} selected={selectedPeriod === '6개월'}>6개월</PeriodButton>
                            <PeriodButton onClick={() => setSelectedPeriod('1년')} selected={selectedPeriod === '1년'}>1년</PeriodButton>
                        </PeriodButtonGroup>
                        <DateFilterContainer>
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date | null) => setStartDate(date)}
                                placeholderText="시작 날짜"
                                dateFormat="yyyy-MM-dd"
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={(date: Date | null) => setEndDate(date)}
                                placeholderText="종료 날짜"
                                dateFormat="yyyy-MM-dd"
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate || undefined} 
                            />
                        </DateFilterContainer>
                    </FilterContainer>
                    <OrderContainer>
                    <ListContainer>
                        <thead>
                            <TableHeader>
                                <TableCell>
                                    <div>주문일자</div>
                                    <div>[주문번호]</div>
                                </TableCell>
                                <TableCell>상품명</TableCell>
                                <TableCell>수량</TableCell>
                                <TableCell>상품금액</TableCell>
                                <TableCell>주문처리상태</TableCell>
                                <TableCell>구매확정</TableCell>
                            </TableHeader>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <OrderRow key={order.ordernumber}>
                                    <TableCell>
                                        <div>{order.date}</div>
                                        <div>[{order.ordernumber}]</div>
                                    </TableCell>
                                    <TableCell>[{order.brand}] {order.productname}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{order.price} 원</TableCell>
                                    <TableCell>
                                        <div>{order.status}</div>
                                        <div style={{marginTop: '5px'}}>
                                            {!order.isPurchased && 
                                                <Button onClick={() => handleCancelRefund(order)}>취소/환불</Button>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {!['취소중', '취소완료'].includes(order.status) && (
                                            order.isPurchased ? (
                                                <Button onClick={() => handleReview(order)}>리뷰작성</Button>
                                            ) : (
                                                <Button onClick={() => handleConfirmPurchase(order)}>구매확정</Button>
                                            )
                                        )}
                                    </TableCell>
                                </OrderRow>
                            ))}
                        </tbody>
                    </ListContainer>
                    </OrderContainer>

                    {isCancelRefundModalOpen && selectedOrder && (
                        <CancelRefundModal
                                order={selectedOrder}
                                isReadOnly={selectedOrder.isRefundRequested}
                                refundReason={selectedOrder.refundReason || ''}
                                refundDetails={selectedOrder.refundDetails || ''}
                                onClose={() => setCancelRefundModalOpen(false)} 
                                onSubmit={handleCancelRefundSubmit}/>
                    )}

                    {isReviewModalOpen && selectedOrder && (
                        <ReviewCreateModal
                            order={selectedOrder}
                            onClose={() =>setReviewModalOpen(false)} 
                            onSubmit={handleReviewSubmit}/>
                     
                    )}

                    {isConfirmPurchasModalOpen && selectedOrder && (
                        <ModalOverlay onClick={() => setConfirmPurchaseModalOpen(false)}>
                            <ModalContainer>
                                <ModalTitle>구매확정을 하시겠습니까?</ModalTitle>
                                <ButtonGroup>
                                    <ConfirmButton bgColor='black' onClick={confirmPurchase}>구매확정하기</ConfirmButton>
                                    <ConfirmButton bgColor='white'>닫기</ConfirmButton>
                                </ButtonGroup>
                            </ModalContainer>

                        </ModalOverlay>
                    )} 
                </>
            )}

            {/* 취소/환불 내역 */}
            {selectedTab === 'refunds' && (
                <>
                    <FilterContainer>
                        <PeriodButtonGroup>
                                <PeriodButton onClick={() => setSelectedPeriod('3개월')} selected={selectedPeriod === '3개월'}>3개월</PeriodButton>
                                <PeriodButton onClick={() => setSelectedPeriod('6개월')} selected={selectedPeriod === '6개월'}>6개월</PeriodButton>
                                <PeriodButton onClick={() => setSelectedPeriod('1년')} selected={selectedPeriod === '1년'}>1년</PeriodButton>
                                <PeriodButton onClick={() => setSelectedPeriod('전체')} selected={selectedPeriod === '전체'}>전체</PeriodButton>
                            </PeriodButtonGroup>
                    </FilterContainer>
                    <OrderContainer>
                        <ListContainer>
                        <thead>
                            <TableHeader>
                                <TableCell>
                                    <div>주문일자</div>
                                    <div>[주문번호]</div>
                                </TableCell>
                                <TableCell>상품명</TableCell>
                                <TableCell>수량</TableCell>
                                <TableCell>상품금액</TableCell>
                                <TableCell>주문처리상태</TableCell>
                                <TableCell>상세정보</TableCell>
                            </TableHeader>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <OrderRow key={order.ordernumber}>
                                    <TableCell>
                                        <div>{order.date}</div>
                                        <div>[{order.ordernumber}]</div>
                                    </TableCell>
                                    <TableCell>[{order.brand}] {order.productname}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{order.price} 원</TableCell>
                                    <TableCell>
                                        <div>{order.status}</div>
                                        <div style={{marginTop: '5px'}}>
                                            {!order.isPurchased && 
                                                <Button onClick={() => handleCancelRefund(order)}>취소/환불</Button>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        
                                    </TableCell>
                                </OrderRow>
                            ))}
                        </tbody>

                        </ListContainer>
                    </OrderContainer>


                    {isCancelRefundModalOpen && selectedOrder && (
                        <CancelRefundModal
                                order={selectedOrder}
                                isReadOnly={selectedOrder.isRefundRequested}
                                refundReason={selectedOrder.refundReason || ''}
                                refundDetails={selectedOrder.refundDetails || ''}
                                onClose={() => setCancelRefundModalOpen(false)} 
                                onSubmit={handleCancelRefundSubmit}/>
                    )}

                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    margin-top: 2rem;
    padding-bottom: 80px; 
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
`;

const TabContiner = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{selected: boolean}>`
    border: none;
    background: none;
    font-size: 1rem;
    color: ${({selected}) => (selected ? 'black' : '#999999')};
    cursor: pointer;
    padding: 0.5rem 1rem;
    &:hover {
        color: ${({selected}) => (selected ? 'black' : '#666666')};  
    }
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    border: 1px solid #ddd;
    margin: 2rem;
    padding: 1rem;
`;

const StatusSelect = styled.select`
    padding: 0.5rem;
    font-size: 1rem;
`;

const PeriodButtonGroup = styled.div`
    display: flex;
    margin-left: 2rem;
`;

const PeriodButton = styled.button<{selected: boolean}>`
    padding: 0.5rem;
    font-size: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 50px;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? '#e0e0e0' : '#f9f9f9')};
    &:hover {
        background-color: #e0e0e0;
      }
`;

const DateFilterContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-left: 2rem;
    align-items: center;
`;

const StyledDatePicker = styled(DatePicker)<DatePickerProps>`
    width: 100px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    font-size: 2rem;
`;

const OrderContainer = styled.div`
    margin: 2rem;
`;

const ListContainer = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
`;

const TableHeader = styled.tr`
    text-align:center;
`;

const TableCell = styled.th`
    padding: 0.8rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
`;

const OrderRow = styled.tr`
    text-align: center;
`;

const Button = styled.button`
      background-color: #bbb;
      color: white;
      padding: 5px;
      font-size: 12px;
      width: 70px;
      border-radius: 5px;
`;


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
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%
  max-width: 700px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
`;

const ModalTitle = styled.h1`
    margin-top: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    padding: 10px;
`;
const ButtonGroup = styled.div`
  margin-top: 1rem;
  padding: 30px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
  justify-content: center;
`;

const ConfirmButton = styled.button<{bgColor?: string}>`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.8rem;
    width: 100px;
    cursor: pointer;
    border: ${({ bgColor }) => (bgColor === 'white' ? '1px solid #ccc' : 'none')};
    background-color: ${({ bgColor }) => bgColor || 'black'};
    color: ${({ bgColor }) => (bgColor === 'white' ? 'black' : 'white')};
`;


export default MyOrderList;
import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import { Order } from "./myOrderList";
import ReviewCreateModal from "./reviewCreateModal";

export interface Review {
    order: Order;
    reviewDate?: string;
    reviewTitle?: string;
    rating?: number;
    reviewContent?: string;
    reviewImages?: string[];
    reviewStatus?: '미작성' | '작성완료';
}

interface MyReviewListprops {
    selectedTab: 'writable' | 'written';
    reviews: Review[];
    onWriteReview?: (orderNumber: string) => void; 
    onEditReview?: (orderNumber: string, updateReview: Partial<Review>) => void;
    onDeleteReview?: (orderNumber: string) => void;
    onEmptyState?: (isEmpty: boolean) => void;
    isReviewModalOpen: boolean;
    setIsReviewModalOpen: (isOpen: boolean) => void;
}

const MyReviewList: React.FC<MyReviewListprops> = ({
    selectedTab,
    reviews,
    onWriteReview,
    onEditReview,
    onDeleteReview,
    onEmptyState,
    isReviewModalOpen,
    setIsReviewModalOpen,
    
}) => {
    
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    
    const filteredReviews = useMemo(() => {
        if(selectedTab === 'writable') {
            return reviews.filter((review) => review.order.isPurchased && !review.reviewStatus);
        }
        return reviews.filter((review) => review.reviewStatus === '작성완료');
    }, [selectedTab, reviews]);

    useEffect(() => {
        if (onEmptyState) {
            onEmptyState(filteredReviews.length === 0);
        }
    }, [filteredReviews.length, onEmptyState]);

    const handleReview = (order: Order) => {
        setSelectedOrder(order);
        setIsReviewModalOpen(true);
    };

    const handleReviewSubmit = () => {
        setIsReviewModalOpen(false);
    };


    return (
        <>
        {selectedTab === 'writable' && (
            <>
            <OrderContainer>
                {filteredReviews.length > 0 ? (
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
                        {reviews.map((review) => (
                            <TableRow key={review.order.ordernumber}>
                                <TableCell>
                                    <div>{review.order.date}</div>
                                    <div>[{review.order.ordernumber}]</div>
                                </TableCell>
                                <TableCell>[{review.order.brand}] {review.order.productname}</TableCell>
                                <TableCell>{review.order.quantity}</TableCell>
                                <TableCell>{review.order.price}</TableCell>
                                <TableCell>{review.order.status}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleReview(review.order)}>
                                        리뷰작성
                                    </Button>
                                </TableCell>
                                </TableRow>
                        ))}
                    </tbody>
                 </ListContainer>
                ) : (
                    <EmptyMessage>작성 가능한 리뷰가 없습니다</EmptyMessage>
                )}

            </OrderContainer>

            {isReviewModalOpen && selectedOrder && (
                <ReviewCreateModal
                order={selectedOrder}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}/>
            )}

            </>
            
        )}

        {selectedTab === 'written' && (
            <>
            <OrderContainer>
                <ListContainer>
                    <thead>
                        <TableHeader>
                            <TableCell>
                                <div>주문일자</div>
                                <div>[주문번호]</div>
                            </TableCell>
                            <TableCell>상품정보</TableCell>
                            <TableCell>리뷰내용</TableCell>
                            <TableCell>작성일</TableCell>
                            <TableCell>리뷰수정</TableCell>
                        </TableHeader>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <TableRow key={review.order.ordernumber}>
                                <TableCell>
                                    <div>{review.order.date}</div>
                                    <div>[{review.order.ordernumber}]</div>
                                </TableCell>
                                <TableCell>[{review.order.brand}] {review.order.productname}</TableCell>
                                <TableCell>{review.reviewContent}</TableCell>
                                <TableCell>{review.reviewDate}</TableCell>
                                <TableCell>
                                    <Button>리뷰수정</Button>
                                </TableCell>
                                </TableRow>
                        ))}
                    </tbody>
                </ListContainer>

            </OrderContainer>

            </>
        )}
        </>
    );
}

export default MyReviewList;


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

const TableRow = styled.tr`
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

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin: 20px 0;
`;
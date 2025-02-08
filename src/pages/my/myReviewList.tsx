import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import { Order } from "./myOrderList";
import ReviewCreateModal from "./reviewCreateModal";
import ReviewDetailModal from "./reviewDetailModal";

export interface Review {
    order: Order;
    reviewDate?: string;
    reviewTitle?: string;
    rating?: number;
    reviewContent?: string;
    reviewImages?: string[];
    reviewStatus?: '미작성' | '작성완료';
    lastDate?: string;
}

interface MyReviewListprops {
    selectedTab: 'writable' | 'written';
    reviews: Review[];
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
    onWriteReview?: (orderNumber: string, updateReview: Partial<Review>) => void; 
    onEditReview?: (orderNumber: string, updateReview: Partial<Review>) => void;
    onDeleteReview?: (orderNumber: string) => void;
    onEmptyState?: (isEmpty: boolean) => void;
    isReviewModalOpen: boolean;
    setIsReviewModalOpen: (isOpen: boolean) => void;
    isReviewDetailModalOpen: boolean;
    setIsReviewDetailModalOpen: (isOpen: boolean) => void;
}

const MyReviewList: React.FC<MyReviewListprops> = ({
    selectedTab,
    reviews,
    setReviews,
    onWriteReview,
    onEditReview,
    onDeleteReview,
    onEmptyState,
    isReviewModalOpen,
    setIsReviewModalOpen,
    isReviewDetailModalOpen,
    setIsReviewDetailModalOpen,
    
}) => {

    console.log("🛠️ MyReviewList props: onWriteReview", onWriteReview);
    console.log("🛠️ MyReviewList props: onEditReview", onEditReview);
    
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
   
    const filteredReviews = useMemo(() => {
        if(selectedTab === 'writable') {
            return reviews.filter((review) => review.order.isPurchased && review.reviewStatus !== '작성완료');
        }
        return reviews.filter((review) => review.reviewStatus === '작성완료');
    }, [selectedTab, reviews]);

    useEffect(() => {
        if (onEmptyState) {
            onEmptyState(filteredReviews.length === 0);
        }
    }, [filteredReviews.length, onEmptyState]);

    // review write
    const handleReviewWrite = (order: Order) => {
        setSelectedOrder(order);
        setSelectedReview(null);
        setIsReviewModalOpen(true);
    };

    // review edit
    const handleReviewEdit = (review: Review) => {
        setSelectedReview(review);
        setSelectedOrder(review.order);
        setIsReviewModalOpen(true);
    };

    const handleReviewSubmit = (updatedReviewData: {
        title: string;
        content: string;
        rating: number;
        image: File | null;
        reviewDate: string;
        lastDate?: string;
        reviewStatus: '미작성' | '작성완료';
    }) => {
        if (!selectedOrder) {

            console.log("handleReviewSubmit: 선택된 주문 없음");
            return;
        }
       

        const updatedReview: Review = {
            order: selectedOrder,
            reviewTitle: updatedReviewData.title,
            reviewContent: updatedReviewData.content,
            rating: updatedReviewData.rating,
            reviewImages: updatedReviewData.image ? [URL.createObjectURL(updatedReviewData.image)] : [],
            reviewDate: updatedReviewData.reviewDate,
            lastDate: updatedReviewData.lastDate,
            reviewStatus: '작성완료',
        };

        console.log(" MyReviewList: handleReviewSubmit 실행", updatedReview);


        setReviews((prevReviews) => {
            // 수정된 리뷰를 찾아 덮어쓰고, 나머지 리뷰는 그대로 두기
            const updatedReviews = prevReviews.filter(
                (review) => review.order.ordernumber !== updatedReview.order.ordernumber
            );
            updatedReviews.push(updatedReview);

            updatedReviews.sort((a, b) => {
                const aDate = a.lastDate ? new Date(a.lastDate).getTime() : new Date(a.reviewDate || '').getTime();
                const bDate = b.lastDate ? new Date(b.lastDate).getTime() : new Date(b.reviewDate || '').getTime();
                return bDate - aDate;
            });

            return updatedReviews;

        });

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
                                    <Button onClick={() => handleReviewWrite(review.order)}>
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
                existingReview={selectedReview ? {
                    title: selectedReview.reviewTitle || '',
                    content: selectedReview.reviewContent || '',
                    rating: selectedReview.rating ?? 0,
                    image: selectedReview.reviewImages?.[0],
                    reviewDate: selectedReview.reviewDate,
                    lastDate: selectedReview.lastDate,
                    reviewStatus: selectedReview.reviewStatus || '미작성',
                } : undefined}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}/>
            )}

            </>
            
        )}

        {selectedTab === 'written' && (
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
                                <TableCell 
                                    style={{cursor: 'pointer'}}
                                    onClick={() => {
                                        setSelectedReview(review);
                                        setIsReviewDetailModalOpen(true);
                                    }}>
                                        {review.reviewContent}</TableCell>
                                <TableCell>{review.reviewDate}</TableCell>
                                <TableCell>
                                    <Button onClick={()=> handleReviewEdit(review)}>리뷰수정</Button>
                                </TableCell>
                                </TableRow>
                        ))}
                    </tbody>
                </ListContainer>
                ) : (
                    <EmptyMessage>작성한 리뷰가 없습니다</EmptyMessage>
                )}

            </OrderContainer>

            {isReviewDetailModalOpen && selectedReview && (
                <ReviewDetailModal
                review={selectedReview}
                onClose={() => {
                    setIsReviewDetailModalOpen(false)
                }}
                />
            )}

            {isReviewModalOpen && selectedOrder && (
                <ReviewCreateModal
                order={selectedOrder}
                existingReview={selectedReview ? {
                    title: selectedReview.reviewTitle || '',
                    content: selectedReview.reviewContent || '',
                    rating: selectedReview.rating ?? 0,
                    image: selectedReview.reviewImages?.[0],
                    reviewDate: selectedReview.reviewDate,
                    lastDate: selectedReview.lastDate,
                    reviewStatus: selectedReview.reviewStatus || '미작성',
                } : undefined}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}/>
            )}

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
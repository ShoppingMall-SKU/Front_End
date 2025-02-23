import React, { useMemo, useState } from "react";
import styled from "styled-components";
import ClientSidebar from "../../components/clientSidebar";
import MyReviewList, {Review} from "./myReviewList";
import Pagination from "../../components/pagination";
import ReviewCreateModal from "./reviewCreateModal";

interface MyReviewProps {
    onWriteReview?: (orderNumber: string) => void;
    onEditReview?: (orderNumber: string, updateReview: Partial<Review>) => void;
    onDeleteReview?: (orderNumber: string) => void;
  }

const MyReview: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState<'writable'|'written'>('writable');
    const [isEmpty, setIsEmpty] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isReviewDetailModalOpen, setIsReviewDetailModalOpen] = useState(false);

    const [reviews, setReviews] = useState<Review[]>([


        {
            order: {
                date: '2024-3-20',
                ordernumber: '54321677',
                brand: '브랜드1',
                productname: '짜장면',
                quantity: 1,
                price: 9900,
                status: '배송완료',
                refundStatus: undefined,
                isPurchased: true
            }
        },
        // {
        //     order: {
        //         date: '2024-3-20',
        //         ordernumber: '54321678',
        //         brand: '브랜드4',
        //         productname: '짬뽕',
        //         quantity: 1,
        //         price: 9900,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false 
        //     },
        //     reviewDate: '2025-01-29',
        //     reviewTitle: '맛있어요',
        //     rating: 5,
        //     reviewContent: '정말 맛있어요!!',
        //     reviewStatus: '작성완료',
        // },
        // {
        //     order: {
        //         date: '2024-2-18',
        //         ordernumber: '13572461',
        //         brand: '브랜드5',
        //         productname: '크림새우1',
        //         quantity: 2,
        //         price: 17800,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false
        //     },
        //     reviewDate: '2025-01-22', 
        //     reviewTitle: '추천합니다',
        //     rating: 3,
        //     reviewContent: '추천하는 상품입니다',
        //     reviewStatus: '작성완료',
        // },{
        //     order: {
        //         date: '2024-2-18',
        //         ordernumber: '13572462',
        //         brand: '브랜드5',
        //         productname: '크림새우2',
        //         quantity: 2,
        //         price: 17800,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false
        //     },
        //     reviewDate: '2025-01-22', 
        //     reviewTitle: '추천합니다',
        //     rating: 3,
        //     reviewContent: '추천하는 상품입니다',
        //     reviewStatus: '작성완료',
        // },
        // {
        //     order: {
        //         date: '2024-2-18',
        //         ordernumber: '13572463',
        //         brand: '브랜드5',
        //         productname: '크림새우3',
        //         quantity: 2,
        //         price: 17800,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false
        //     },
        //     reviewDate: '2025-01-22', 
        //     reviewTitle: '추천합니다',
        //     rating: 3,
        //     reviewContent: '추천하는 상품입니다',
        //     reviewStatus: '작성완료',
        // },{
        //     order: {
        //         date: '2024-2-18',
        //         ordernumber: '13572464',
        //         brand: '브랜드5',
        //         productname: '크림새우4',
        //         quantity: 2,
        //         price: 17800,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false
        //     },
        //     reviewDate: '2025-01-22', 
        //     reviewTitle: '추천합니다',
        //     rating: 3,
        //     reviewContent: '추천하는 상품입니다',
        //     reviewStatus: '작성완료',
        // },
        // {
        //     order: {
        //         date: '2024-2-18',
        //         ordernumber: '13572465',
        //         brand: '브랜드5',
        //         productname: '크림새우5',
        //         quantity: 2,
        //         price: 17800,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false
        //     },
        //     reviewDate: '2025-01-22', 
        //     reviewTitle: '추천합니다',
        //     rating: 3,
        //     reviewContent: '추천하는 상품입니다',
        //     reviewStatus: '작성완료',
        // },
        // {
        //     order: {
        //         date: '2024-2-18',
        //         ordernumber: '13572466',
        //         brand: '브랜드5',
        //         productname: '크림새우6',
        //         quantity: 2,
        //         price: 17800,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false
        //     },
        //     reviewDate: '2025-01-22', 
        //     reviewTitle: '추천합니다',
        //     rating: 3,
        //     reviewContent: '추천하는 상품입니다',
        //     reviewStatus: '작성완료',
        // },
        // {
        //     order: {
        //         date: '2024-2-18',
        //         ordernumber: '13572467',
        //         brand: '브랜드5',
        //         productname: '크림새우7',
        //         quantity: 2,
        //         price: 17800,
        //         status: '배송완료',
        //         refundStatus: undefined,
        //         isPurchased: false
        //     },
        //     reviewDate: '2025-01-22', 
        //     reviewTitle: '추천합니다',
        //     rating: 3,
        //     reviewContent: '추천하는 상품입니다',
        //     reviewStatus: '작성완료',
        // }
    ]);

    const handleWriteReview = (orderNumber: string, newReview: Partial<Review>) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.order.ordernumber === orderNumber
                    ? { ...review, ...newReview, reviewStatus: "작성완료" }
                    : review
            )
        );
        console.log("📝 handleWriteReview 실행", newReview);
    };

    const handleEditReview = (orderNumber: string, updatedReview: Partial<Review> ) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.order.ordernumber === orderNumber
                    ? { ...review, ...updatedReview, reviewStatus:'작성완료' } // ✅ 기존 리뷰 업데이트
                    : review
            )
        );
    
        console.log("✏️ handleEditReview 실행", updatedReview);
    };
    

    const handleDeleteReview = (orderNumber: string) => {
        setReviews((prevReviews) =>
            prevReviews.filter((review) => review.order.ordernumber !== orderNumber)
        );
        console.log("handleDeleteReview 실행", orderNumber);
    };

    const filteredReviews = useMemo(() => {
        return selectedTab === 'writable'
        ? reviews.filter((review) => !review.reviewStatus || review.reviewStatus === '미작성')
        : reviews.filter((review) => review.reviewStatus === '작성완료');
    }, [selectedTab, reviews]);

    const handleEmptyState = (empty: boolean) =>{
        setIsEmpty(empty);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

    return(
        <Container>
            <ClientSidebar />
            <Content>
                <Title>리뷰관리</Title>
                <TabContiner>
                    <TabButton
                    selected={selectedTab==='writable'}
                    onClick={() => setSelectedTab('writable')}>
                    작성 가능한 리뷰</TabButton>
                    <TabButton
                    selected={selectedTab==='written'}
                    onClick={() => setSelectedTab('written')}>
                    작성한 리뷰</TabButton>
                </TabContiner>
                <MyReviewList
                    selectedTab={selectedTab}
                    reviews={currentReviews}
                    setReviews={setReviews}
                    onEmptyState={handleEmptyState}
                    onWriteReview={handleWriteReview}
                    onEditReview={handleEditReview}
                    onDeleteReview={handleDeleteReview}
                    isReviewModalOpen={isReviewModalOpen}
                    setIsReviewModalOpen={setIsReviewModalOpen}
                    isReviewDetailModalOpen={isReviewDetailModalOpen}
                    setIsReviewDetailModalOpen={setIsReviewDetailModalOpen}
            
                />
                {!isEmpty && !isReviewModalOpen && !isReviewDetailModalOpen && (
                    <PaginationContainer>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    </PaginationContainer>
                )}
            </Content>
        </Container>
    );
};

export default MyReview;

const Container = styled.div`
    display: flex;
    min-height: calc(100vh - 80px); 
    padding-bottom: 80px; 
    flex-direction: row;
`;

const Content = styled.div`
    flex-grow: 1;
    display: flex;
    padding: 10px;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;

const Title = styled.h1`
    margin-top: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
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


const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding-bottom: 20px; 
    position: sticky;
    bottom: 0; 
    z-index: 10;
`;
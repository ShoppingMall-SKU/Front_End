import styled from "styled-components";
import { Review } from "./myReviewList";

interface ReviewDetailModalProps {
    review: Review;
    onClose: () => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
};

const ReviewDetailModal:React.FC<ReviewDetailModalProps> = ({review, onClose}) => {
    return(
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Container>
                    <ContentWrapper>
                    <Title>{review.reviewTitle}</Title>
                    <StarContainer>
                        {[1,2,3,4,5].map((star) => (
                            <Star key={star} selected={star <= (review.rating ?? 0)}>★</Star>
                        ))}
                    </StarContainer>
                    <ReviewInfo>
                        {formatDate(review.reviewDate ?? '')}
                        {review.lastDate && ` (최종 수정날짜: ${formatDate(review.lastDate ?? '')})`}
                    </ReviewInfo>
                    <ContentBox>{review.reviewContent}</ContentBox>
                    {(review.reviewImages ?? []).length > 0 && (
                        <ImageContainer>
                            {review.reviewImages?.map((imgSrc, index) => (
                                <ImageBox key={index}>
                                    <img src={imgSrc} alt={`첨부된 리뷰 이미지 ${index+1}`} />
                                </ImageBox>
                            ))}
                        </ImageContainer>
                    )}
                    </ContentWrapper>
                    
                    <Button bgColor="white" onClick={onClose}>닫기</Button>
                </Container>
            </ModalContainer>
        </ModalOverlay>
    )
}

export default ReviewDetailModal;


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
    background: white;
    padding: 3rem;
    border-radius: 8px;
    width: 700px;
    box-sizing: border-box;
    max-width: none;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const StarContainer = styled.div`
    font-size: 10px;
    color: orange;
    margin-bottom: 0.5rem;
`;

const Star = styled.span<{ selected: boolean }>`
    font-size: 1.5rem;
    color: ${({ selected }) => (selected ? '#f39c12' : '#ccc')};
    cursor: pointer;
`;

const ReviewInfo = styled.p`
    font-size: 14px;
    color: gray;
    margin-bottom: 0.5rem;
`

const ContentBox = styled.div`
    width: 100%;
    padding: 15px;
    min-height: 120px;
    font-size: 16px;
    text-align: left;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
    width: 100%;
    padding: 15px;
    display: flex;
    max-height: 200px;
    justify-content: center;
`;

const ImageBox = styled.div`
    min-height: 120px;
    display: flex;
    align-items: left;
    justify-content: center;

    img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
    }
`;


const Button = styled.button<{bgColor?: string}>`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.8rem;
    width: 100px;
    cursor: pointer;
    border: ${({ bgColor }) => (bgColor === 'white' ? '1px solid #ccc' : 'none')};
    background-color: ${({ bgColor }) => bgColor || 'black'};
    color: ${({ bgColor }) => (bgColor === 'white' ? 'black' : 'white')};
`;
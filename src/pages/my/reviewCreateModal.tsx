import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Order} from './myOrderList'

interface ReviewCreateModalProps {
    order: Order;
    onClose: () => void;
    existingReview?: {
        title: string;
        content: string;
        rating: number;
        image?: string;
        reviewDate?: string;
        lastDate?: string;
        reviewStatus?: '미작성' | '작성완료';  
    };
    onSubmit: (reviewData: {
        title: string;
        content: string;
        rating: number;
        image: File | null;
        reviewDate: string;
        lastDate?: string;
        reviewStatus: '미작성' | '작성완료';  
    }) => void;
}


const ReviewCreateModal: React.FC<ReviewCreateModalProps> = ({onClose, onSubmit, existingReview}) => {

    const [title, setTitle] = useState(existingReview?.title || '');
    const [content, setContent] = useState(existingReview?.content || '');
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState(existingReview?.image || '');
    const [reviewDate] = useState(existingReview?.reviewDate || new Date().toISOString());
    const [lastDate, setLastDate] = useState(existingReview?.lastDate || '');
    const [reviewStatus, setReviewStatus] = useState<'미작성' | '작성완료'>(existingReview?.reviewStatus ?? '미작성');  

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleRating = (value: number) => {
        setRating(value);
    }

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0]);
            setPreviewImage(URL.createObjectURL(e.dataTransfer.files[0]));
        }
    };

    const handleSubmit = () => {
        if (!title || !content || rating === 0) {
            alert("제목, 내용, 별점을 입력해주세요");
            return;
        }
    
        const updatedLastDate = new Date().toISOString();
    
        const reviewData = {
            title,
            content,
            rating,
            image,
            reviewDate: formatDate(reviewDate),
            lastDate: existingReview ? formatDate(updatedLastDate) : undefined,
            reviewStatus: '작성완료',
        } as const;

        console.log("reviewCreateModal : onSubmit 호출", reviewData);
    
        onSubmit(reviewData);
    
        if (existingReview) {
            onSubmit(reviewData);
            alert('리뷰가 수정되었습니다');
        } else {
            onSubmit(reviewData)
            alert('리뷰가 작성되었습니다')
        }
        onClose();
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Title>리뷰 {existingReview?'수정':'작성'}</Title>
                <FormGroup>
                    <Label>제목</Label>
                    <Input 
                        type="text" 
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>별점</Label>
                    <StarContainer>
                        {[1,2,3,4,5].map((star) => (
                            <Star
                                key={star}
                                selected={star <= rating}
                                onClick={() => handleRating(star)}
                            >        
                                ★
                            </Star>
                        ))}
                    </StarContainer>    
                </FormGroup>

                <FormGroup>
                    <Label>내용</Label>
                    <Textarea
                        placeholder='리뷰 내용을 작성해주세요'
                        value={content}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = '리뷰 내용을 작성해주세요'}
                        onChange={(e) => setContent(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>사진첨부</Label>
                    <ImageUpload
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleImageDrop}>
                        {image || previewImage ? (
                            <img src={previewImage} alt="리뷰 이미지" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        ) : (
                            <p>이미지를 업로드하세요</p>
                        )}
                    </ImageUpload>
                </FormGroup>


                <ButtonGroup>
                    <Button bgColor="black" onClick={handleSubmit}>리뷰{existingReview ?'수정':'등록'}</Button>
                    <Button bgColor="white" onClick={onClose}>취소</Button>
                </ButtonGroup>

            </ModalContainer>
        </ModalOverlay>
    )
}

export default ReviewCreateModal;

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

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    padding: 10px;
`;

const FormGroup = styled.div`
    magin: 1rem;
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #ddd;

`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    width: 100px;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 2px;
`;

const StarContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const Star = styled.span<{ selected: boolean }>`
    font-size: 1.5rem;
    color: ${({ selected }) => (selected ? '#f39c12' : '#ccc')};
    cursor: pointer;
`;


const Textarea = styled.textarea`
    width: 100%;
    height: 180px;
    padding: 0.5rem;
    align-items: center;
    border: 1px solid #ddd;
`;

const ImageUpload = styled.div`

    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: center;
    cursor: pointer;
    input {
        width: 100%
    }
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
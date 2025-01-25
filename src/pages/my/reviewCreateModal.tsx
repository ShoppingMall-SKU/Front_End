import styled from "styled-components";
import React, {useState} from "react";
import {Order} from './myOrderList'

interface ReviewCreateModalProps {
    order: Order;
    onClose: () => void;
    onSubmit: (reviewData: {title:string, content: string, rating: number, image: File | null}) => void;
}

const ReviewCreateModal: React.FC<ReviewCreateModalProps> = ({onClose, onSubmit}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState<File | null>(null);

    const handleRating = (value: number) => {
        setRating(value);
    }

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = () => {
        onSubmit({title, content, rating, image});
        
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Title>리뷰작성</Title>
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
                        
                        {image ? (
                            <p>{image.name}</p>
                        ) : (
                            <p>이미지를 업로드하세요</p>
                        )}
                    </ImageUpload>
                </FormGroup>


                <ButtonGroup>
                    <Button bgColor="black">리뷰등록</Button>
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
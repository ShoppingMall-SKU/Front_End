import React, { useState } from "react";
import styled from "styled-components";

interface inquiryWriteModal {
  onClose: () => void;
  onSubmit: (
    title: string,
    type: string,
    content: string,
    image: File | null
  ) => void;
}

const InquiryWriteModal: React.FC<inquiryWriteModal> = ({
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    if (!type || type === "default") {
      alert("문의 유형을 선택하세요");
      return;
    }
    if (!content.trim()) {
      alert("문의 내용을 입력하세요");
      return;
    }

    alert("문의가 작성되었습니다");
    onSubmit(title, type, content, image);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>상품문의</Title>
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
          <Label>문의 유형</Label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="default">문의 유형</option>
            <option value="상품">상품 문의</option>
            <option value="배송">배송 문의</option>
            <option value="기타">기타 문의</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <Textarea
            placeholder="리뷰 내용을 작성해주세요"
            value={content}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "리뷰 내용을 작성해주세요")}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>사진첨부</Label>
        </FormGroup>

        <ButtonGroup>
          <Button bgColor="black" onClick={handleSubmit}>
            문의작성
          </Button>
          <Button bgColor="white" onClick={onClose}>
            취소
          </Button>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InquiryWriteModal;

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

const Select = styled.select`
  width: 40%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 0.5rem;
  align-items: center;
  border: 1px solid #ddd;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;
const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 30px;
  overflow-x: auto;
  justify-content: flex-start;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20px;
  height: 20px;
  background: #cccccc80;
  color: white;
  border: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
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

const Button = styled.button<{ bgColor?: string }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  width: 100px;
  cursor: pointer;
  border: ${({ bgColor }) => (bgColor === "white" ? "1px solid #ccc" : "none")};
  background-color: ${({ bgColor }) => bgColor || "black"};
  color: ${({ bgColor }) => (bgColor === "white" ? "black" : "white")};
`;

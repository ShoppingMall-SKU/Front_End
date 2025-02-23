import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Order} from './myOrderList';

interface CancelRefundModalProps {
    order: Order;
    onClose: () => void;
    onSubmit: (resaon: string, details: string) => void;
    isReadOnly?: boolean;
    refundReason: string;
    refundDetails: string;
}

const CancelRefundModal: React.FC<CancelRefundModalProps> = ({order, refundReason, refundDetails, onClose, onSubmit}) => {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [reasonDetails, setReasonDetails] = useState<string>('');
    const isReadOnly = order.status === '취소중' || order.status === '취소완료';

    useEffect(() => {
        if (isReadOnly) {
            setSelectedReason(refundReason || '');
            setReasonDetails(refundDetails || '');
        }
    }, [refundReason, refundDetails, isReadOnly]);

    const handleRequestCancel = () => {
        if (!selectedReason || selectedReason === 'default') {
            alert('취소/환불 사유 선택은 필수입니다');
            return;
        }
        if (!reasonDetails.trim()) {
            alert('취소/환불 사유 작성은 필수입니다');
            return;
        }

        if(!isReadOnly) {
            alert('주문취소가 요청되었습니다');
        }
        
        onSubmit(selectedReason, reasonDetails);
        onClose();

    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Title>취소 및 환불</Title>
                <Label>취소/환불 사유</Label>
                <Select 
                    value={selectedReason} 
                    onChange={(e) => setSelectedReason(e.target.value)}
                    disabled={isReadOnly} >
                    <option value='default'>취소/환불</option>
                    <option value='단순변심'>단순변심</option>
                    <option value='배송지연'>배송지연</option>
                    <option value='기타'>기타</option>
                </Select>
                <Textarea
                    placeholder='취소/환불 사유 작성은 필수입니다'
                    value={reasonDetails}
                    onChange={(e) => setReasonDetails(e.target.value)} 
                    disabled={isReadOnly} />
                
                <ButtonGroup>
                    {!isReadOnly && <Button bgColor="black" onClick={handleRequestCancel}>취소요청</Button>}
                    <Button bgColor="white" onClick={onClose}>닫기</Button>
                </ButtonGroup>
                
            </ModalContainer>
        </ModalOverlay>
    );
};

export default CancelRefundModal;


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
    width: 500px;
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

const Label = styled.label`
    margin-bottom: 0.5rem;
    font-weight: bold;
    display: block;
`;

const Select = styled.select`
    width: 40%;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    justify-content: center;
    border: 1px solid #ddd;
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
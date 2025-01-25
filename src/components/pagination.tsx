import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    }) => {
    return (

    <PaginationContainer>
      <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
        </button>
      ))}
      <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            &gt;
      </button>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;

  button {
    padding: 8px 12px;
    cursor: pointer;

    &.active {
        color: black;
        font-weight: bold;
    }

    &:disabled {
        color: #ddd;
        cursor: not-allowed;
    }
  }
`;
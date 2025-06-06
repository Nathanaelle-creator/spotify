import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }


return (
    <div>
    <Pagination >
    {pageNumbers.map(number => (
        <Pagination.Item
        key={number} 
        onClick={() => paginate(number)}>
        {number}
        </Pagination.Item>
    ))}
    </Pagination>
    </div>
);
};

export default PaginationComponent;

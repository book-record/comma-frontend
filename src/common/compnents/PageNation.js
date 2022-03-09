import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import PageButton from "./PageButton";

function PageNation({ setPageNumber, pageNumber, numberOfPages }) {
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const goToPreviousPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNextPage = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const handleSelectPage = (page) => {
    setPageNumber(page);
  };

  return (
    <ActiveForm>
      <PageButton
        onClick={goToPreviousPage}
        disabled={pageNumber === 0}
        title="&lt;"
      />
      {pages.map((pageIndex) => (
        <PageButton
          key={pageIndex}
          onClick={handleSelectPage.bind(this, pageIndex)}
          title={pageIndex + 1}
          disabled={pageNumber === pageIndex}
        />
      ))}

      <PageButton
        onClick={goToNextPage}
        disabled={pageNumber === numberOfPages - 1}
        title="&gt;"
      />
    </ActiveForm>
  );
}

const ActiveForm = styled.div`
  display: flex;
  justify-content: center;
`;

export default PageNation;

PageNation.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
};

import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";

import { bookSearch } from "../../api/bookSearch";
import noImage from "../../assets/noImage.png";

function FindBook({ setBook, setIsChoice, setIsError }) {
  const [text, setText] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [display, setDisplay] = useState(false);
  const [lists, setLists] = useState([]);
  const choicedBook = useRef(null);

  useEffect(() => {
    if (selectedBook.length > 0) {
      handleSelectBook(selectedBook);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook]);

  const handleSelectBook = useCallback(
    async (query) => {
      const params = {
        query,
        sort: "accuracy",
        page: 1,
        size: 1,
      };

      const { data } = await bookSearch(params);
      const result = data.documents.filter((book) =>
        book.title.includes(choicedBook.current)
      );

      setIsError(false);

      if (result.length) {
        setBook(result);
        setIsChoice(true);
        setLists([]);
      } else {
        setIsChoice(false);
      }
    },
    [setBook, setIsChoice, setIsError]
  );

  const handleSearchBook = useCallback(
    async (query) => {
      const params = {
        query,
        page: 1,
        size: 5,
      };
      const { data } = await bookSearch(params);

      const correctList = data.documents.filter((book) =>
        book.title.includes(text)
      );
      setLists(correctList);
      setDisplay(true);
    },
    [text]
  );

  const handleOnEnter = (e) => {
    if (e.keyCode === 13) {
      setSelectedBook(text);
      choicedBook.current = text;
      setDisplay(false);
      setText("");
    }
  };

  const clickSelecteBook = (bookTitle) => {
    setSelectedBook(bookTitle);
    choicedBook.current = text;
    setDisplay(false);
    setText("");
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (text.length > 1) {
        handleSearchBook(text);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [handleSearchBook, text]);

  const handleTextUpdate = (e) => {
    setText(e.target.value);
  };

  const handleClickBookTitle = () => {
    setDisplay(!display);
  };

  return (
    <Container>
      <BookInput
        placeholder="??? ????????? ???????????????"
        type="search"
        name="query"
        onKeyDown={handleOnEnter}
        onChange={handleTextUpdate}
        onClick={handleClickBookTitle}
        value={text}
      />
      {display && (
        <AutoContainer>
          {lists.map((book) => (
            <Option
              key={book.datetime}
              onClick={clickSelecteBook.bind(this, book.title)}
            >
              <span>{book.title.split("(")[0]}</span>
              <BookImage
                src={book.thumbnail ? book.thumbnail : noImage}
                alt={book.title}
              />
            </Option>
          ))}
        </AutoContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookInput = styled.input`
  display: flex;
  position: relative;
  width: 90%;
  height: 40px;
  border-radius: 10px;
  text-align: center;
`;

const AutoContainer = styled.div`
  position: absolute;
  top: 39px;
  left: 50%;
  width: 90%;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  transform: translateX(-50%);
  background-color: #fff;
`;

const Option = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

const BookImage = styled.img`
  width: 100px;
  height: 90px;
`;

export default FindBook;

FindBook.propTypes = {
  setBook: PropTypes.func.isRequired,
  setIsChoice: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
};

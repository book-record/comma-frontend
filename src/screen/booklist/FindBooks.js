import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";

import noImage from "../../assets/noImage.png";
import { bookSearch } from "../../service/bookSearch";

function FindBook({ setBook, setIsFind }) {
  const [text, setText] = useState("");
  const [item, setItem] = useState("");
  const [display, setDisplay] = useState(false);
  const [lists, setLists] = useState([]);
  const chooseBook = useRef(null);

  useEffect(() => {
    if (item.length > 0) {
      handleSelectBook(item);
    }
  }, [item]);

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
        book.title.includes(chooseBook.current)
      );
      if (result.length) {
        setBook(result);
        setIsFind(true);
        setLists([]);
      } else {
        setIsFind(false);
      }
    },
    [setBook, setIsFind]
  );

  const handleSearchBook = useCallback(
    async (query) => {
      const params = {
        query,
        page: 1,
        size: 5,
      };
      const { data } = await bookSearch(params);

      const bookList = data.documents.filter((book) =>
        book.title.includes(text)
      );
      setLists(bookList);
      setDisplay(true);
    },
    [text]
  );

  const handleOnEnter = (e) => {
    if (e.keyCode === 13) {
      setItem(text);
      chooseBook.current = text;
      setDisplay(false);
      setText("");
    }
  };

  const clickSelecteBook = (bookTitle) => {
    setItem(bookTitle);
    chooseBook.current = text;
    setDisplay(false);
    setText("");
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (text.length > 2) {
        handleSearchBook(text);
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [text]);

  const handleTextUpdate = (e) => {
    setText(e.target.value);
  };

  return (
    <Container>
      <BookInput
        placeholder="책 제목을 입력하세요"
        type="search"
        name="query"
        onKeyDown={handleOnEnter}
        onChange={handleTextUpdate}
        onClick={() => setDisplay(!display)}
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
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const BookInput = styled.input`
  position: relative;
  display: flex;
  width: 90%;
  height: 40px;
  border-radius: 10px;
  text-align: center;
`;

const AutoContainer = styled.div`
  position: absolute;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  background-color: #fff;
  top: 39px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;

  padding: 5px;
`;

const BookImage = styled.img`
  width: 100px;
  height: 90px;
`;

export default FindBook;

FindBook.propTypes = {
  setBook: PropTypes.func.isRequired,
  setIsFind: PropTypes.func.isRequired,
};

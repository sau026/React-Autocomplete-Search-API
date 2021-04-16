import React, { useState, useEffect, useCallback, Component } from "react";
import "./index.scss";

const Autocomplete = (props) => {
  const [allToDoData, setAllToDoData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (props.options === "no data") {
      setFilteredData([]);
    } else {
      setFilteredData(props.options);
    }
  }, [props.options]);

  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  var callDebounce = useCallback(
    debounceFunction((nextValue) => props.searchValueProps(nextValue), 500),
    []
  );

  const onValueChange = (e) => {
    setSearchKeyword(e.target.value);
    callDebounce(e.target.value);
  };

  const getSearchedListJSX = () => {
    if (filteredData && filteredData.length) {
      return (
        <ul
          className={`${
            filteredData && filteredData.length
              ? "searched__list_modify__border searched__list"
              : "searched__list"
          }`}
        >
          {filteredData &&
            filteredData.map((ele, i) => {
              return <li key={i}>{ele}</li>;
            })}
        </ul>
      );
    } else {
      return (
        <div className="no-options">
          <em>No Option!</em>
        </div>
      );
    }
  };

  return (
    <>
      <div className="search__body">
        <input
          type="text"
          onChange={onValueChange}
          className={`${
            filteredData && filteredData.length
              ? "modify__input__border"
              : "null"
          }`}
        ></input>
        {getSearchedListJSX()}
      </div>
    </>
  );
};

export default Autocomplete;

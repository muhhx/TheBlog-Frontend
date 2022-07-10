import React, { useState } from "react";
import useSearch from "../../hooks/useSearch";
import Spinner from "../../components/Spinner";
import * as C from "./styles";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, error, posts, users] = useSearch(searchTerm, pageNumber);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  return (
    <>
      <input type="text" onChange={handleSearchTerm} />
      <div>Teste</div>
      <div>Teste</div>
      <div>Teste</div>
      <Spinner />
    </>
  );
}

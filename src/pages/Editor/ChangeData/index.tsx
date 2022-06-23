import React, { useState, useEffect } from "react";
import useUpdateAccount from "../../../hooks/useUpdateAccount";

import Spinner from "../../../components/Spinner";
import Input from "../../../components/Input";
import * as C from "./styles";

const NAME_REJEX = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const USERNAME_REJEX = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,29}$/;

export default function ChangeData() {
  const [status, error, update] = useUpdateAccount();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [bio, setBio] = useState("");
  const [validBio, setValidBio] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [validPicture, setValidPicture] = useState(false);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    setValidPicture(picture ? true : false);
  }, [picture]);

  useEffect(() => {
    setValidName(NAME_REJEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidUsername(USERNAME_REJEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidBio(bio.length < 140 && bio.length > 0);
  }, [bio]);

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    update({ name, bio, username, picture });
  };

  return (
    <C.Form onSubmit={handleUpdateAccount}>
      {status === "failure" && <C.Error>{error}</C.Error>}

      <C.PictureWrapper>
        <C.Picture image={picture} />
        <Input
          label="Nova foto de perfil"
          inputType="text"
          state={picture}
          validState={validPicture}
          setState={setPicture}
          error="Foto inválida"
        />
      </C.PictureWrapper>

      <Input
        label="Novo nome"
        inputType="text"
        state={name}
        validState={validName}
        setState={setName}
        error="Nome inválido"
        max={30}
      />

      <Input
        label="Nova bio"
        inputType="text"
        state={bio}
        validState={validBio}
        setState={setBio}
        error="Bio inválida"
        max={140}
      />

      <Input
        label="Novo username"
        inputType="text"
        state={username}
        validState={validUsername}
        setState={setUsername}
        error="Username inválido"
      />

      <C.Button
        disabled={
          (!validName && !validBio && !validUsername && !validPicture) ||
          status === "loading"
            ? true
            : false
        }
      >
        Salvar
        {status === "loading" ? <Spinner /> : ""}
      </C.Button>
    </C.Form>
  );
}

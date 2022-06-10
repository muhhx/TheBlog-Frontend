import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState("");

  const userName = useSelector((state: RootState) => state.auth.name);
  const axiosPrivate = useAxiosPrivate();

  async function handleGetData() {
    try {
      const response = await axiosPrivate.get("/api/session");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <div>Dashboard do {userName}</div>
      <button onClick={handleGetData}>Get data</button>
    </section>
  );
}

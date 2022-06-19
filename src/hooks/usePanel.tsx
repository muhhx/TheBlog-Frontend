import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { openPanel, closePanel } from "../features/panel/panelSlice";

export default function usePanel() {
  const dispatch: AppDispatch = useDispatch();

  const open = (
    category: string,
    payloadData?: { title: string; content: string } | string
  ) => {
    const payload = payloadData || null;
    dispatch(openPanel({ category, payload }));
  };

  const close = () => {
    dispatch(closePanel());
  };

  return { open, close };
}

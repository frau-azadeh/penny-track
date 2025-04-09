import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// استفاده از دیسپچ با تایپ مناسب
export const useAppDispatch: () => AppDispatch = useDispatch;
// استفاده از سلکتور با تایپ مناسب
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

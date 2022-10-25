import { ReactNode } from "react";

const MainTitle = ({ children, style }: { children: ReactNode, style?: string}) => <h1 className={`text-3xl font-semibold pb-4 border-solid border-b-2 border-gray ${style}`}>{children}</h1>;

export default MainTitle;

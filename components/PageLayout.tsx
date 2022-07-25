import Image from "next/image";
import { FC, ReactNode } from "react";
import Header from "../components/Header";

type PageProps = {
  children?: JSX.Element | ReactNode;
  isCentered?: Boolean;
};

const PageLayout: FC = ({ children, isCentered }: PageProps) => (
  <>
    <Header />
    <div
      className="pageLayout"
      style={isCentered && { justifyContent: "center", alignItems: "center" }}
    >
      {children && <div className="inner_container">{children}</div>}
    </div>
  </>
);

export default PageLayout;

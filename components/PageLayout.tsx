import { FC } from "react";
import Header from "../components/Header";

type PageProps = {
  children?: JSX.Element | JSX.Element[];
  isCentered?: Boolean;
};

const PageLayout: FC<PageProps> = ({ children, isCentered }: PageProps) => (
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

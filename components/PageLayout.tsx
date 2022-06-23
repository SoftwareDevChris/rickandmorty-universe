import type { NextComponentType } from "next";

import Header from "../components/Header";

type PageProps = {
  children?: JSX.Element;
};

const PageLayout = ({ children }: PageProps) => (
  <>
    <Header />
    <div className="pageLayout">{children}</div>
  </>
);

export default PageLayout;

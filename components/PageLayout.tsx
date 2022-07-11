import Image from "next/image";
import { FC, ReactNode } from "react";
import Header from "../components/Header";

import BG from "../public/skypng.png";

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
      <Image
        src={BG}
        layout={"fill"}
        objectFit={"cover"}
        alt="Background image of stars in space"
      />
      {children && <div className="inner_container">{children}</div>}
    </div>
  </>
);

export default PageLayout;

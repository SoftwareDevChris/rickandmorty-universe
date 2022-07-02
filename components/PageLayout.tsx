import Header from "../components/Header";

type PageProps = {
  children?: JSX.Element;
  isCentered?: Boolean;
};

const PageLayout = ({ children, isCentered }: PageProps) => (
  <>
    <Header />
    <div
      className="pageLayout"
      style={isCentered && { justifyContent: "center", alignItems: "center" }}
    >
      {children}
    </div>
  </>
);

export default PageLayout;

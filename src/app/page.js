// import Home_V1 from "./(home)/home-v1/page";
import Home_V2 from "./(home)/home-v2/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "Home v1 || Homez - Real Estate NextJS Template",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home_V2 />
    </Wrapper>
  );
}

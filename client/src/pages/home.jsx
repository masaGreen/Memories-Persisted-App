import { styled, Box} from "@mui/material";
import AsideMenu from "../components/asideMenu/asideMenu";
import Memories from "./memories/memories";


const MainBox = styled(Box)({
  height: "100%",
  flex: 9,
  backgroundImage:"linear-gradient(rgba(223, 221, 221,0.4),rgba(223, 221, 221,0.6))"
});

const Home = () => {
  return (
<>
      <MainBox>
        <Memories  />
      </MainBox>
      <AsideMenu />
      </>
  );
};
export default Home;

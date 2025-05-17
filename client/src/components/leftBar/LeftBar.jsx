import "./leftBar.scss";
import Friends from "@mui/icons-material/People";
import Groups from "@mui/icons-material/Groups";
import Market from "@mui/icons-material/Storefront";
import Watch from "@mui/icons-material/SmartDisplay";
import Memories from "@mui/icons-material/History";
import Events from "@mui/icons-material/Event";
import Gaming from "@mui/icons-material/SportsEsports";
import Gallery from "@mui/icons-material/Collections";
import Videos from "@mui/icons-material/VideoLibrary";
import Messages from "@mui/icons-material/Mail";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <Friends />
            <span>Friends</span>
          </div>
          <div className="item">
            <Groups />
            <span>Groups</span>
          </div>
          <div className="item">
            <Market />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <Watch />
            <span>Watch</span>
          </div>
          <div className="item">
            <Memories />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <Events />
            <span>Events</span>
          </div>
          <div className="item">
            <Gaming />
            <span>Gaming</span>
          </div>
          <div className="item">
            <Gallery />
            <span>Gallery</span>
          </div>
          <div className="item">
            <Videos />
            <span>Videos</span>
          </div>
          <div className="item">
            <Messages />
            <span>Messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;


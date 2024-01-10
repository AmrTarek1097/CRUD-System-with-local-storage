
import { IoIosArrowDown } from "react-icons/io";
import * as React from "react";
import Button from "./SharedComponents/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { context } from "../Context/Store";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const {name,setNavigateHome}= React.useContext(context);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    navigate('/')
    setNavigateHome(false)
  };



  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-10 index py-6 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[#475467] text-xl font-bold flex justify-between items-center gap-3">
          {" "}
          <img src="/images/Logo.svg" alt="" />
          <p className="text-2xl">SPACEJAT</p>
        </div>

        <div >
          <Button
            className="flex gap-2 justify-center items-center text-xl font-semibold"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {name}
            <IoIosArrowDown className="text-xl font-semibold" />
          </Button>
          <Menu
          
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem  onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;

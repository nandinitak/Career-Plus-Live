import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
const NavbarContainer = styled.div`
  height: ${({ isFullScreen }) => (isFullScreen ? "0" : "4.5rem")};
  background: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarContent = styled.button`
  background: transparent;
  border: 0;

  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 60px;
`;

const MainHeading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  color: #fff;

  span {
    font-weight: 700;
  }
`;

const Navbar = ({ isFullScreen }) => {
  const navigate = useNavigate();

  function leaveRoom() {
    navigate("/practice");
  }
  return (
    <NavbarContainer isFullScreen={isFullScreen}>
      <NavbarContent
        onClick={() => {
          navigate("/");
        }}
      >
        <MainHeading>
          <div className="flex items-center gap-2">
            <span>Code</span> Deck
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center text-white bg-black"
              onClick={leaveRoom} // Implement leaveRoom function
            >
              <LogOut className="w-4 h-4 mr-2" />
              Leave Room
            </Button>
          </div>
        </MainHeading>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;

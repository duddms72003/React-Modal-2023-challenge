import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Link, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 17px;
  font-weight: bold;
  padding: 60px;
  color: white;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 25px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:last-child {
    margin-right: 0;
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

function Header() {
  const homeMatch = useMatch("/");
  const comingSoonMatch = useMatch("coming-soon");
  const nowPlayingMatch = useMatch("now-playing");

  return (
    <Nav initial={{ backgroundColor: "rgba(0,0,0,1)" }}>
      <Items>
        <Item>
          <Link to="/">
            POPULAR {homeMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>

        <Item>
          <Link to="coming-soon">
            COMING SOON {comingSoonMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>

        <Item>
          <Link to="now-playing">
            NOW PLAYING {nowPlayingMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
      </Items>
    </Nav>
  );
}

export default Header;

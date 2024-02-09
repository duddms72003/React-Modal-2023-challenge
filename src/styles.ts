import { styled } from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
`;

export const Loader = styled.div`
  margin: 80px;
`;

export const ItemList = styled(motion.ul)`
  margin: 150px 50px auto 50px;
`;

export const Items = styled(motion.li)`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  cursor: pointer;
  > div {
    /* margin: 0 auto; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Image = styled(motion.div)<{ bgphoto: string }>`
  border-radius: 20px;
  min-width: 280px;
  max-width: 300px;
  height: 400px;
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  /* margin: 0 auto; */
`;

export const Title = styled.p`
  margin-top: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 19px;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  min-width: 500px;
  max-width: 300px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

export const BigContents = styled.p`
  overflow-y: scroll;
  margin: 20px;
  height: 260px;
  top: 0;
`;

export const BigDetail = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  font-weight: 400;
  padding-bottom: 20px;
  position: relative;
`;

export const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  cursor: pointer;
`;

export const rowVariants = {
  hidden: {
    opacity: 0,
    y: 50, // 숨겨진 상태에서 아래로 이동
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // 애니메이션 지속 시간 설정
    },
  },
  exit: {
    opacity: 0,
    y: -50, // 나가는 상태에서 위로 이동
    transition: {
      duration: 0.5, // 애니메이션 지속 시간 설정
    },
  },
};

export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -50,
    transition: {
      delay: 0.1,
      duration: 0.3,
      type: "tween",
    },
  },
};

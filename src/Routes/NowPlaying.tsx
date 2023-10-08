import { useQuery } from "react-query";
import {
  IAPIResponse,
  IMovieDetail,
  getMovie,
  getNowPlaying,
  makeImagePath,
} from "../api";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { styled } from "styled-components";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
`;

const Loader = styled.div`
  margin: 80px;
`;

const ItemList = styled(motion.ul)`
  margin: 150px 50px auto 50px;
`;

const Items = styled(motion.li)`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  cursor: pointer;
  > div {
    margin: 0 auto;
  }
`;

const Image = styled(motion.div)<{ bgphoto: string }>`
  border-radius: 20px;
  min-width: 280px;
  max-width: 300px;
  height: 400px;
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  margin: 0 auto;
`;

const Title = styled.p`
  margin-top: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
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

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigContents = styled.p`
  overflow-y: scroll;
  padding: 20px;
  height: 260px;
  top: 0;
`;

const BigDetail = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  font-weight: 400;
  padding-bottom: 20px;
  position: relative;
`;

const CloseBtn = styled.button`
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

const rowVariants = {
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

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -50,
    transition: {
      delay: 0.1,
      duaration: 0.3,
      type: "tween",
    },
  },
};

function NowPlaying() {
  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch(
    "now-playing/movies/:movieId"
  );
  const movieId: string = bigMovieMatch?.params.movieId || "";
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "nowPlaying"],
    getNowPlaying
  );

  const { data: movieDetail } = useQuery<IMovieDetail>(["movie", movieId], () =>
    getMovie(movieId)
  );

  const [index, setIndex] = useState(0);
  const onBoxClicked = (movieId: number) => {
    navigate(`movies/${movieId}`);
  };

  const closeClick = () => navigate("/now-playing");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <ItemList
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            key={index}
          >
            <AnimatePresence initial={false}>
              <Items>
                {data?.results.slice(1).map((movie) => (
                  <div key={movie.id}>
                    <Image
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path)}
                    />
                    <Title>{movie.title}</Title>
                  </div>
                ))}
              </Items>
            </AnimatePresence>
          </ItemList>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  // onClick={closeClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 50 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <CloseBtn onClick={closeClick}>X</CloseBtn>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path
                          )})`,
                        }}
                      />
                      <BigContents>
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigDetail>
                          <p style={{ marginBottom: "25px" }}>
                            {clickedMovie.overview}
                          </p>
                          <p>Budget: {movieDetail?.budget}</p>
                          <p>Revenue: {movieDetail?.revenue}</p>
                          <p>Runtime: {movieDetail?.runtime}</p>
                          <p>Rating: {movieDetail?.vote_average}</p>
                          <p>Homepage: {movieDetail?.homepage}</p>
                        </BigDetail>
                      </BigContents>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default NowPlaying;

import { useQuery } from "react-query";
import {
  IAPIResponse,
  IMovieDetail,
  getMovie,
  getNowPlaying,
  makeImagePath,
} from "../api";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import {
  Wrapper,
  Loader,
  ItemList,
  Items,
  Image,
  Title,
  Overlay,
  BigMovie,
  BigCover,
  BigContents,
  BigDetail,
  BigTitle,
  CloseBtn,
} from "../styles";

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
      duration: 0.3,
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
            transition={{ type: "tween", duration: 1 }}
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
                  style={{ top: scrollY.get() + 170 }}
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

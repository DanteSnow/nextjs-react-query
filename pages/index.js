import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import styled from "styled-components";

const API_KEY = "6948daf616018b43a336d778947e1980";

export default function Home() {
  const [movies, setMovies] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular`
      );
      const { results } = await response.json();
      console.log(results);
      setMovies(results);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Seo title="HOME" />
      {!movies && <h1>Loading...</h1>}
      <S.ImageContainer>
        {movies?.map((movie) => (
          <S.MoviePosterContainer key={movie.id}>
            <S.Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
            />
            <S.MovieTitle>{movie.original_title}</S.MovieTitle>
          </S.MoviePosterContainer>
        ))}
      </S.ImageContainer>
    </div>
  );
}

const S = {
  Image: styled.img`
    width: 200px;
  `,

  MoviePosterContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,

  MovieTitle: styled.h4`
    // 글자가 길어지면 ...으로 처리
    overflow: hidden;
    width: 200px;
    text-align: center;
  `,

  ImageContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  `,
};

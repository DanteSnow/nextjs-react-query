export async function getServerSideProps() {
  const response = await fetch(
    `https://learn.codeit.kr/api/codestudit/users/codeit`
  );
  const data = await response.json();
  return {
    props: {
      movies: data,
    },
  };
}

export default function About({ movies }) {
  return (
    <>
      <div>{movies?.id}</div>
      <div>{movies?.username}</div>
      <div>{movies?.name}</div>
    </>
  );
}

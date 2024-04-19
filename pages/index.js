export async function getServerSideProps() {
  const response = await fetch(
    `https://learn.codeit.kr/api/codestudit/posts
    `
  );
  const { results } = await response.json();
  return {
    props: {
      results,
    },
  };
}

export default function Home({ results }) {
  return (
    <>
      {results.map((result) => (
        <div key={result.id}>
          <h1>{result.user.name}</h1>
          <p>{result.content}</p>
        </div>
      ))}
    </>
  );
}

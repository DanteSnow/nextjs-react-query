import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch(
    `https://learn.codeit.kr/api/codestudit/posts?limit=100
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
        <Link key={result.id} href={`/posts/${result.user.username}`}>
          <div>
            <h1>{result.user.name}</h1>
            <p>{result.content}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

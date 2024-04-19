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
      <h1>전체 포스트 목록</h1>
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

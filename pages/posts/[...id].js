import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(context);
  const response = await fetch(
    `https://learn.codeit.kr/api/codestudit/posts?username=${id}
    `
  );
  const { results } = await response.json();
  return {
    props: {
      results,
    },
  };
}

export default function Detail({ results }) {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <h1>{router.query.id}님의 포스트 목록</h1>
      {results.map((result) => (
        <div key={result.id}>
          <h1>{result.user.name}</h1>
          <p>{result.content}</p>
        </div>
      ))}
    </>
  );
}

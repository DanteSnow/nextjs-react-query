import Link from "next/link";
import { useState } from "react";

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
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`https://learn.codeit.kr/api/codestudit/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        content,
      }),
    });
    setUsername("");
    setContent("");
    window.location.reload();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

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
      <form onSubmit={handleSubmit}>
        <input onChange={handleUsernameChange} placeholder="이름" />
        <textarea onChange={handleContentChange} placeholder="내용" />
        <button>등록</button>
      </form>
    </>
  );
}

import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

async function fetchPosts() {
  const response =
    await fetch(`https://learn.codeit.kr/api/codestudit/posts?limit=100
  `);
  return response.json();
}

async function postPost(data) {
  const response = await fetch(`https://learn.codeit.kr/api/codestudit/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  const results = data ? data.results : [];

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => postPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setContent("");
      setUsername("");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    uploadPostMutation.mutate({
      username,
      content,
    });
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
        <input
          value={username}
          onChange={handleUsernameChange}
          placeholder="이름"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="내용"
        />
        <button>등록</button>
      </form>
    </>
  );
}

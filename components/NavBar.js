import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function NavBar() {
  const router = useRouter();

  return (
    <S.Navigation>
      <Link
        style={{ color: router.pathname === "/" ? "red" : "blue" }}
        href="/"
      >
        <h1>HOME PAGE</h1>
      </Link>
      <Link
        style={{ color: router.pathname === "/about" ? "red" : "blue" }}
        href="/about"
      >
        <h1>ABOUT PAGE</h1>
      </Link>
    </S.Navigation>
  );
}

const S = {
  Navigation: styled.nav`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
  `,
};

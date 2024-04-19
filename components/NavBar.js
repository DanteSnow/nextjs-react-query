import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <h1>HOME {router.pathname === "/" ? "🏠" : ""}</h1>
      </Link>
    </nav>
  );
}

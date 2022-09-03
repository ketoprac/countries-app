import Link from "next/link";
import { BsMoon } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <a>
          <h2>Where in the world?</h2>
        </a>
      </Link>
      <div>
          <BsMoon />
        <p>
          Dark Mode
        </p>
      </div>
    </nav>
  );
}

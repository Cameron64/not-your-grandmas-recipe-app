import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/example">
              <a>Example</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

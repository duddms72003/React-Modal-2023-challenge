import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/">
        <a className="nav-link underline yellow">Home</a>
      </Link>
      <Link href="/about">
        <a className="nav-link underline yellow">About</a>
      </Link>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          padding: 45px 60px;
          font-size: 30px;
        }
        .nav-link {
          text-decoration: none;
          transition: color 0.3s;
          font-family: "Shantell Sans", cursive;
        }

        .underline {
          line-height: 1.2;
          font-weight: 700;
          background-image: linear-gradient(
            transparent calc(100% - 3px),
            #000 3px
          );
          background-repeat: no-repeat;
          background-size: 0% 100%;
          transition: background-size 0.8s;
          color: #000;
          cursor: pointer;
        }
        @media (min-width: 1000px) {
          .underline {
          }
        }
        .underline.yellow {
          background-image: linear-gradient(transparent 60%, #f8cd07 40%);
        }
        .underline:hover {
          background-size: 100% 100%;
        }
      `}</style>
    </nav>
  );
}

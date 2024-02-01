import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="container">
        <h1 className="title">Have a lovely day!</h1>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          margin: 0 auto 80px auto;
          padding: 20px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }
        .title {
          text-align: center;
        }
      `}</style>
    </>
  );
}

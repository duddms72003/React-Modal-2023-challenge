import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Detail() {
  const router = useRouter();
  const [items, setItems] = useState();

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `https://books-api.nomadcoders.workers.dev/list?name=${router.query.genre}`
        )
      ).json();
      setItems(results);
    })();
  }, []);

  return (
    <div className="container">
      <h4 className="title">{router.query.title || "Loading..."}</h4>

      <div className="books">
        {items?.books?.map((book, id) => (
          <div className="book" key={id}>
            {/* <img src={book.book_image} alt="" /> */}
            <div className="no-image-container">
              {book.book_image ? (
                <img src={book.book_image} alt="" />
              ) : (
                <p className="no-image">no image</p>
              )}
            </div>
            <div className="contents">
              <h4 className="book-title">{book.title}</h4>
              <p className="book-author">{book.author}</p>
              <Link href={`${book.amazon_product_url}`}>
                <a className="link-btn">Buy</a>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          padding: 20px;
        }

        .title {
          font-size: 25px;
          text-align: center;
          padding-bottom: 50px;
        }

        .books {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .book {
          position: relative;
          text-align: center;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          box-shadow: 0 5px 10px -5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 8px;
          overflow: hidden;
        }

        img {
          width: 100%;
          display: flex;
        }

        .no-image-container {
          height: 100%;
        }
        .no-image {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin: 0;
        }

        .contents {
          padding: 30px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-direction: column;

          .book-title {
            font-size: 17px;
            margin-top: 10px;
          }

          .book-author {
            margin-bottom: 40px;
            color: #2ebdff;
          }

          .link-btn {
            padding: 20px 60px;
            justify-content: center;
            text-align: center;
            display: flex;
            display: inline-block;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            border-radius: 8px;

            &:hover {
              transform: translateY(-7px);
              transition: 0.2s;
              background-color: rgba(248, 204, 7, 1);
              /* box-shadow: 0 5px 10px -5px rgba(248, 204, 7, 1); */
            }
          }
        }
      `}</style>
    </div>
  );
}

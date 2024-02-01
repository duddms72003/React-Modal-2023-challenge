import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [lists, setLists] = useState();

  console.log("라우터보자", router);

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(`https://books-api.nomadcoders.workers.dev/lists`)
      ).json();
      setLists(results);
      console.log(results);
    })();
  }, []);

  const onClick = (id, title, genre) => {
    router.push(
      {
        pathname: `/list/${id}`,
        query: {
          id,
          title,
          genre,
        },
      },
      `/list/${id}`
    );
  };

  return (
    <div className="container">
      <h1 className="title">The New York Times Best Seller Explorer</h1>

      <div className="genres">
        {lists?.map((list, id) => (
          <div
            onClick={() =>
              onClick(id, list.display_name, list.list_name_encoded)
            }
            key={id}
            className="genre"
          >
            <Link
              legacyBehavior
              href={{
                pathname: `/list/${id}`,
                query: {
                  id,
                  title: list.display_name,
                  genre: list.list_name_encoded,
                },
              }}
              as={`/list/${id}`}
            >
              <a>{list.display_name}</a>
            </Link>
          </div>
        ))}
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
          margin: 20px 0 40px 0;
        }

        .genres {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;

          .genre {
            box-shadow: 0 5px 10px -5px;
            padding: 20px;
            border-radius: 8px;
            cursor: pointer;
            display: inline-block;
            transition: transform 0.2s ease-in-out;
            &:hover {
              background-color: rgba(248, 204, 7, 1);
              transition: 0.8s;
              /* box-shadow: 0 5px 10px -5px rgba(248, 204, 7, 1); */
              transform: translateY(-7px);
            }
          }
        }
      `}</style>
    </div>
  );
}

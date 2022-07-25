import Image from "next/image";
import { useRouter } from "next/router";

import { DataModel } from "../utility/DataModels";

type CardProps = {
  data: [] | undefined;
};

const CardItem = ({ data }: CardProps) => {
  const router = useRouter();

  return (
    <>
      {data?.map((char: DataModel) => {
        return (
          <figure className="card" key={char.id}>
            <Image
              height={500}
              width={500}
              src={char.image}
              alt={`An image of ${char.name}`}
              onClick={() => router.push(`characters/${char.id}`)}
              style={{ cursor: "pointer" }}
              placeholder="blur"
              blurDataURL="/public/profile-placeholder.png"
            />

            <figcaption className="card_content">
              <h5 className="card_title">{char.name}</h5>
              <p className="card_desc">{char.species}</p>

              <div className="button_container">
                <button
                  className="card_button"
                  onClick={() => router.push(`characters/${char.id}`)}
                >
                  Read more
                </button>
              </div>
            </figcaption>
          </figure>
        );
      })}
    </>
  );
};

export default CardItem;

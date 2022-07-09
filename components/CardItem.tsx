import Image from "next/image";
import { useRouter } from "next/router";

import { DataModel } from "../utility/DataModels";

import styles from "../styles/Card.module.scss";

type CardProps = {
  data: [] | undefined;
};

const CardItem = ({ data }: CardProps) => {
  const router = useRouter();

  return (
    <>
      {data?.map((char: DataModel) => {
        return (
          <div className={styles.card} key={char.id}>
            <Image
              height={500}
              width={500}
              src={char.image}
              alt={`An image of ${char.name}`}
              onClick={() => router.push(`characters/${char.id}`)}
              style={{ cursor: "pointer" }}
            />

            <figcaption className={styles.card_content}>
              <h5 className={styles.card_title}>{char.name}</h5>
              <p className={styles.card_desc}>{char.species}</p>

              <div className={styles.button_container}>
                <button
                  className={styles.card_button}
                  onClick={() => router.push(`characters/${char.id}`)}
                >
                  Read more
                </button>
              </div>
            </figcaption>
          </div>
        );
      })}
    </>
  );
};

export default CardItem;

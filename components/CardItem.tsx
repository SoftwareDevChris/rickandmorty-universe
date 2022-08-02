import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

import { ResultsFromAPI } from "../utility/Interfaces";
import MyButton from "./Button";

interface CardProps {
  data: ResultsFromAPI;
}

const animateItem = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0 },
};

const CardItem: FC<CardProps> = ({ data }: CardProps) => {
  const router = useRouter();

  return (
    <motion.figure className="card" variants={animateItem}>
      <Image
        height={500}
        width={500}
        src={data.image}
        alt={`An image of ${data.name}`}
        onClick={() => router.push(`characters/${data.id}`)}
        style={{ cursor: "pointer" }}
        placeholder="blur"
        blurDataURL="/public/profile-placeholder.png"
      />

      <figcaption className="card_content">
        <h5 className="card_title">{data.name}</h5>
        <p className="card_desc">{data.species}</p>

        <div className="button_container">
          <MyButton href={`/characters/${data.id}`}>Read more</MyButton>
        </div>
      </figcaption>
    </motion.figure>
  );
};

export default CardItem;

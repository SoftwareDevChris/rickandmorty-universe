import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import DataModel from "../utility/DataModel";

type CardProps = {
  data: [];
  dataType: string;
};

const CardItem = ({ data, dataType }: CardProps) => {
  return (
    <>
      {data.map((char: DataModel) => {
        return (
          <Card
            key={char.id}
            sx={{ width: "100%", background: "#1a1a1acf", color: "#ffff" }}
          >
            {dataType === "characters" && (
              <CardMedia
                component="img"
                height={250}
                image={char.image}
                alt={`An image of ${char.name}`}
              />
            )}
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                noWrap={true}
                gutterBottom
              >
                {char.name}
              </Typography>
              <Typography variant="body2" color="#ffff">
                {char.species}
              </Typography>
            </CardContent>

            <CardActions>
              <Button href={`characters/${char.id}`}>Read more</Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default CardItem;

{
  /* <figcaption className={styles.figure_caption}>
  <h3 className={styles.figure_title}>{char.name}</h3>
  <div className={styles.figure_info}>
    <p>{char.species}</p>
  </div>
</figcaption>; */
}

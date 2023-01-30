import Competitions from "./Football/Competitions";
import Card from "./Card";
import "./Stylings/Card.css";

function Home() {
  return (
    <div className="homepage">
      <Card
        sport="cricket"
        image={
          "https://cdnb.artstation.com/p/assets/images/images/026/045/099/large/the-pxl-art-sachin.jpg?1587715989"
        }
      />
      <Card
        sport="football"
        image="https://wallpaperaccess.com/full/815127.jpg"
      />
      <Card
        sport="f1"
        image="https://i.pinimg.com/736x/e4/32/80/e43280f3d3dfc98c9d5fd322a49028a7.jpg"
      />
    </div>
  );
}

export default Home;

import React from "react";
import Hero from "../home/Hero.jsx";
import Trending from "../home/Trending.jsx";
import Devotional from "../home/Devotional.jsx";
import Creator from "../home/Creator.jsx";

function Home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Devotional />
      <Creator />
    </div>
  );
}

export default Home;

import React from "react";
import Hero from "./Hero";
import Swipe from "./Swipe";
import Banner from "./Banner";
import AboutUs from "./About";
import Work from "./Work";
import Menu from "./Menu";
import Sepeciality from "./Sepeciality";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Intro from "./Intro";
import References from "./References";
import Organic from "./organic";
import Rice from "./Rice";
import Brahmmis from "./Brahmmis";

const Home = () => {
  return (
    <div>
      <HomePage />
      <Intro />
      <Menu />
      <AboutUs />
      <Hero />
      <Work />
      <Organic />
      <Rice />
      <Sepeciality />
      <References />
      <Brahmmis />
      <Footer />
    </div>
  );
};

export default Home;

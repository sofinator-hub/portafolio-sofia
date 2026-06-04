import Navbar from "./components/navigation/Navbar";

import Hero from "./components/hero/Hero";

import SkillsConstellation from "./components/skills/SkillsConstellation";

import MissionsMachine from "./components/missions/MissionsMachine";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />    

      <SkillsConstellation />

      <MissionsMachine />

    </>
  );
}
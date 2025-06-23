import Image from "next/image";
import {Navbar} from "@/components/Navbar";
import {Banner} from "@/components/Banner";
import {CompaniesBanner} from "@/components/CompaniesBanner";
import {CategoryFitness} from "@/components/CategoryFitness";
import {TrainerChoose} from "@/components/TrainerChoose";

export default function Home() {
  return (
    <>
      <Navbar/>
        <Banner/>
        <CompaniesBanner/>
      <CategoryFitness/>
        <TrainerChoose/>
    </>
  );
}

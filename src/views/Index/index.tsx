import Head from "next/head";
import CallToActionCard from "./components/CallToActionCard";
import HeroBanner from "./components/HeroBanner";
import MainPageContent from "./components/MainPageContent";

const IndexView = (): JSX.Element => (
  <div style={{ height: "300vh" }} className="bg-gray-900">
    <Head>
      <title>Planning Poker</title>
    </Head>
    <HeroBanner />
    <CallToActionCard />
    <MainPageContent />
  </div>
);
export default IndexView;

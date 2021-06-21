import React from "react";
import Head from "next/head";

const SettingsView = (): JSX.Element => (
  <div className="bg-gray-900 h-screen pt-48 flex justify-center text-white">
    <Head>
      <title>Settings | Planning Poker</title>
    </Head>
    <h1 className="text-3xl font-bold">Settings</h1>
  </div>
);
export default SettingsView;

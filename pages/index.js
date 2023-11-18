import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import OurServices from "../comps/OurServices"
import Main from "../comps/Main"
import HomeAbout from "../comps/HomeAbout"
import OurFeatures from "../comps/OurFeatures"
import OurAPP from "../comps/OurAPP"
import HomeContact from "../comps/HomeContact"
import GetStarted from "../comps/GetStarted"
import { i18n } from '../comps/i18n';
import { useState } from 'react'
import { useEffect } from "react";

export default function Home() {

  return (
    <>
      {/* <input className="text-center mx-auto" type="text" placeholder="test" value={test} onChange={(e)=> setTest(e.target.value)}  /> */}
      {/* main */}
      <Main />

      {/* About safqa */}
      <HomeAbout />

      {/* our services */}
      <OurServices />

      {/* our features */}
      <OurFeatures />

      {/* our APP */}
      <OurAPP margin />

      {/* HomeContact */}
      {/* <HomeContact /> */}

      {/* GetStarted */}
      <GetStarted />

    </>
  );
}


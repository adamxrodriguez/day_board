'use client'

import Meta from './components/Meta/index';
import { LandingLayout } from './layouts/LandingLayout';
 import {
  CallToAction,
  Features,
  Footer,
  Guides,
  Hero,
  Pricing,
  Testimonial,
} from './sections/index';
import { Fragment, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";


import './styles/globals.css';
let rawdata = require('./messages/en.json');

let langCode = "en"
let langObject = {}
langObject[langCode] = {}

langObject[langCode].translation = rawdata
i18n
  .use(initReactI18next)
  .init({
    resources: langObject,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });


export default function Home() {
const [user, setUser] = useState(null);
useEffect(() => {
  fetch("/api/users/1").then(res => res.json().then(user => setUser(user)))
}, []);

  return ( 
    <Fragment>

    <div>user: {user?.name}</div>
  <SessionProvider>
  <LandingLayout>
      <Meta
        title="Dayboard Hub"
        description="A Yatch Management app for your prized yatchs."
      />
      <Hero />
      <Features />
      {/* 
      <Pricing />
       */}
      <Guides />
      <Testimonial />
      <CallToAction />
      <Footer />
    </LandingLayout>
     </SessionProvider>

    </Fragment>
  );
}

import Meta from '@/components/Meta/index';
import { LandingLayout } from '@/app/layouts/LandingLayout';
import {
  CallToAction,
  Features,
  Footer,
  Guides,
  Hero,
  Pricing,
  Testimonial,
} from '@/sections/index';

const Home = () => {
  return (
    <LandingLayout>
      <Meta
        title="Dayboard Hub"
        description="A Yatch Management app for your prized yatchs."
      />
      <Hero />
      <Features />
      {/* <Pricing /> */}
      <Guides />
      <Testimonial />
      <CallToAction />
      <Footer />
    </LandingLayout>
  );
};

export default Home;

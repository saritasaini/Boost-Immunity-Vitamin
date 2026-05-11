import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ScrollExperience from '../components/ScrollExperience';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>BOOST | Immunity Gummy Vitamin</title>
        <meta name="description" content="BOOST Immunity Gummy Vitamin - Stay Healthy, Stay Boosted" />
      </Head>

      <LoadingScreen isFinished={!loading} />
      <Navbar />
      <main>
        <ScrollExperience />
      </main>
    </>
  );
}

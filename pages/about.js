import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About BOOST</title>
      </Head>
      <main className="bg-transparent min-h-screen text-white font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-40 px-4 text-center mt-20">
          <h1 className="font-display text-[clamp(60px,10vw,120px)] mb-6 tracking-wide">ABOUT US</h1>
          <p className="text-xl max-w-md mx-auto text-white/70">We believe in making immunity fun. No bullshit, just good ingredients.</p>
        </div>
        <Footer />
      </main>
    </>
  );
}

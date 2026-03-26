import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "MoodCast",
  description: "Match your mood to music and motivation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

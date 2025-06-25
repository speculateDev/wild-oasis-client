"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useState, useEffect } from "react";

function Logo() {
  const [imgW, setImgW] = useState(60);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setImgW(40);
      } else {
        setImgW(60);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        quality={100}
        height={imgW}
        width={imgW}
        src={logo}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100 hidden md:inline">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;

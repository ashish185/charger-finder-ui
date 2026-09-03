"use client"
import { redirect, usePathname } from "next/navigation";

const Home = () => {
  const pathName= usePathname();
  if(pathName === '/'){
    redirect("/login")
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <p className="text-sm text-on-surface-variant">Loading…</p>
    </div>
  );
}

export default Home;

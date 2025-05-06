"use client";

import { Button } from "./ui/button";

export default function TestButton() {
  function handleThemeToggle() {
    console.log("Yes");
    // Toggle dark mode
    document.documentElement.classList.toggle("dark");
  }

  return (
    <>
      <Button className="font-bold" onClick={() => handleThemeToggle()}>
        Yes
      </Button>
    </>
  );
}

import React, { useEffect, useRef } from "react";
import anime from "animejs";

function Footer() {
  const textWrapperRef = useRef(null);

  useEffect(() => {
    if (!textWrapperRef.current) return;

    // Wrap every letter in a span
    const textWrapper = textWrapperRef.current;
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          Math.min(
            textWrapper.getBoundingClientRect().width + 20,
            window.innerWidth - 40
          ),
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add({
        targets: ".ml11 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=775",
        delay: (el, i) => 34 * (i + 1),
      })
      .add({
        targets: ".ml11",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }, []);

  return (
    <div className="h-20 flex justify-center items-center border-t border-gray-100 px-4 overflow-hidden">
      <h1 className="ml11 text-black font-bold text-xl md:text-3xl text-center">
        <span className="text-wrapper relative inline-block">
          <span className="line line1 absolute left-0 h-full w-[2px] md:w-[3px] bg-black opacity-0"></span>
          <span ref={textWrapperRef} className="letters">
            Made by TriForce Developers ♥
          </span>
        </span>
      </h1>
    </div>
  );
}

export default Footer;

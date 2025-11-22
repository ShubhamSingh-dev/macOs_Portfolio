import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text: string, className: string, baseWeight = 400) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `wght ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setUpTextHover = (
  container: HTMLElement | null,
  type: keyof typeof FONT_WEIGHTS
) => {
  if (!container) return () => {}; 

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateletter = (
    letter: HTMLElement,
    weight: number,
    duration = 0.25
  ) => {
    return gsap.to(letter, {
      fontVariationSettings: `"wght" ${weight}`,
      duration: duration,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);
      animateletter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateletter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  // Return cleanup function
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};
const Welcome = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    const subtitleCleanup = setUpTextHover(subtitleRef.current, "subtitle");
    const titleCleanup = setUpTextHover(titleRef.current, "title");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey👋, I'm Shubham Singh! Welcome to my",
          "font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>
          This portfolio is best viewed on a larger screen for an optimal
          experience.
        </p>
      </div>
    </section>
  );
};

export default Welcome;

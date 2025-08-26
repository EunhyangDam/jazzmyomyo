import React, { useEffect, useRef } from "react";
import "./scss/section.scss";
import Section1Component from "./main/Section1Component";
import Section2Component from "./main/Section2Component";
import Section3Component from "./main/Section3Component";
import Section4Component from "./main/Section4Component";
import Section5Component from "./main/Section5Component";
import Section6Component from "./main/Section6Component";
import Section7Component from "./main/Section7Component";
import Section8Component from "./main/Section8Component";
import Section9Component from "./main/Section9Component";
import Section10Component from "./main/Section10Component";
import Section11Component from "./main/Section11Component";
import Section12Component from "./main/Section12Component";
import Section13Component from "./main/Section13Component";
import CSButton from "./custom/CSButton";

export default function MainComponent(props) {
  const sectionRefs = useRef([]);

  useEffect(() => {
    try {
      const winHeight = window.innerHeight * 0.6;
      const onScr = () => {
        const scrPos = window.scrollY + winHeight;
        if (window.scrollY === 0) {
          sectionRefs.current.forEach((sec) => {
            if (sec) sec.classList.remove("active");
          });
        } else {
          sectionRefs.current.forEach((sec) => {
            if (sec && scrPos > sec.offsetTop) sec.classList.add("active");
          });
        }
      };
      window.addEventListener("scroll", onScr);
      return () => window.removeEventListener("scroll", onScr);
    } catch (error) {
      alert("ERROR!");
      console.log(error);
      return;
    }
  }, []);
  return (
    <main id="main">
      <Section1Component ref={(el) => (sectionRefs.current[0] = el)} />
      <Section2Component ref={(el) => (sectionRefs.current[1] = el)} />
      <Section3Component ref={(el) => (sectionRefs.current[2] = el)} />
      <Section4Component ref={(el) => (sectionRefs.current[3] = el)} />
      <Section5Component ref={(el) => (sectionRefs.current[4] = el)} />
      <Section6Component ref={(el) => (sectionRefs.current[5] = el)} />
      <Section7Component ref={(el) => (sectionRefs.current[6] = el)} />
      <Section8Component ref={(el) => (sectionRefs.current[7] = el)} />
      <Section9Component ref={(el) => (sectionRefs.current[8] = el)} />
      <Section10Component ref={(el) => (sectionRefs.current[9] = el)} />
      <Section11Component ref={(el) => (sectionRefs.current[10] = el)} />
      <Section12Component ref={(el) => (sectionRefs.current[11] = el)} />
      <Section13Component ref={(el) => (sectionRefs.current[12] = el)} />
      <CSButton />
    </main>
  );
}

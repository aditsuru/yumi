export * from "@gsap/react";
export * from "gsap";
export * from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

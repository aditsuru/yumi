export * from "@gsap/react";
export * from "gsap";
export * from "gsap/ScrollSmoother";
export * from "gsap/ScrollTrigger";
export * from "gsap/SplitText";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

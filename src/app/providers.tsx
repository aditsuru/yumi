"use client";

import { useRef } from "react";
import { ScrollSmoother, useGSAP } from "@/lib/client/gsap";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const wrapperRef = useRef(null);

	useGSAP(
		() => {
			ScrollSmoother.create({
				wrapper: wrapperRef.current,
				content: "#smooth-content",
				smooth: 2,
				smoothTouch: 0.1,
				effects: true,
				normalizeScroll: true,
			});
		},

		{ scope: wrapperRef }
	);

	return (
		<div id="smooth-wrapper" ref={wrapperRef}>
			<div id="smooth-content">{children}</div>
		</div>
	);
};

/** biome-ignore-all lint/a11y/noStaticElementInteractions: none */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: none */
/** biome-ignore-all lint/style/noNonNullAssertion: none */
/** biome-ignore-all lint/suspicious/noNonNullAssertedOptionalChain: none */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: none */
"use client";

import {
	IconArrowRight,
	IconPlayerPause,
	IconPlayerPlay,
	IconPlayerTrackNext,
	IconRefresh,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/client/gsap";

export default function Page() {
	const scope = useRef<HTMLDivElement>(null);
	const scopeTimeline = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	const tl = useRef<gsap.core.Timeline>(null);

	useEffect(() => {
		const el = scope.current;

		if (!el) return;

		const observer = new ResizeObserver((entries) => {
			setWidth(entries[0].contentRect.width);
		});

		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	useGSAP(
		() => {
			if (!width) return;
			gsap.to([".box"], {
				x: (_, target: HTMLDivElement) => {
					return width - target.offsetWidth;
				},
				duration: 0.8,
				delay: 0.8,
				repeatDelay: 0.8,
				ease: "bounce.out",
				easeReverse: "bounce.out",
				repeat: Infinity,
				yoyo: true,
				stagger: {
					amount: 0.8,
				},
			});
		},
		{
			scope,
			dependencies: [width],
			revertOnUpdate: true,
		}
	);

	useGSAP(
		() => {
			tl.current = gsap
				.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.8 })

				.to([".green"], {
					rotate: 360,
					ease: "circ.inOut",
					duration: 0.8,
				})

				.to(
					[".blue"],
					{
						rotate: 360,
						ease: "circ.inOut",
						duration: 0.8,
					},
					"<0.4"
				)

				.to([".pink"], {
					rotate: 360,
					ease: "circ.inOut",
					duration: 0.8,
				});
		},
		{ scope: scopeTimeline }
	);

	const { contextSafe } = useGSAP();

	const handleButtonMouseEnter = contextSafe(() => {
		gsap.to([".button"], {
			scale: 1.035,
			ease: "back.out",
			duration: 0.2,
		});
	});

	const handleButtonMouseLeave = contextSafe(() => {
		gsap.to([".button"], {
			scale: 1,
			ease: "power2.out",
			duration: 0.2,
		});
	});

	const handleButtonClick = contextSafe(() => {
		const tl = gsap.timeline({
			defaults: {
				ease: "back.out",
				duration: 0.2,
			},
		});
		tl.to([".button"], {
			scale: 0.98,
			y: 5,
		}).to([".button"], {
			scale: 1.035,
			y: 0,
		});
	});

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".scroll-container",
				start: "top 85%",
				toggleActions: "restart none none reset",
			},
		});

		tl.from([".scroll-fade"], {
			y: -15,
			opacity: 0,
			delay: 0.4,
			duration: 0.8,
			ease: "power2.out",
			stagger: {
				amount: 0.8,
			},
		});
	});

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".ball-container",
					start: "top 75%",
					end: "bottom 50%",
					scrub: 2,
				},
			});

			tl.to([".ball"], {
				x: (_, target: HTMLDivElement) => {
					return width - target.offsetWidth;
				},
				y: (_, target: HTMLDivElement) => {
					return (
						target.parentElement?.parentElement?.offsetHeight! -
						2 * target.offsetHeight
					);
				},
				ease: "circ.inOut",
			});
		},
		{ dependencies: [width], revertOnUpdate: true }
	);

	useGSAP(() => {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".pin-container",
				start: "top 15%",
				end: "bottom bottom",
				pin: ".pinned",
				pinSpacing: false,
			},
		});
	});

	useGSAP(() => {
		const panels = gsap.utils.toArray<HTMLElement>(".panel");
		panels.forEach((panel, i) => {
			const isLast = i === panels.length - 1;

			if (isLast) {
				return;
			}

			ScrollTrigger.create({
				trigger: panel,
				start: "top top",
				end: "bottom top",
				pin: true,
				pinSpacing: false,
			});
		});
	});

	useGSAP(() => {
		const split = SplitText.create(".split-heading", {
			type: "lines",
			mask: "lines",
			autoSplit: true,
		});

		const splitContent = SplitText.create(".split-content", {
			type: "words, lines",
			autoSplit: true,
		});

		gsap.from(split.lines, {
			scrollTrigger: {
				trigger: ".split-container",
				start: "top bottom",
				toggleActions: "restart none none reset",
			},
			y: 400,
			rotation: 15,
			duration: 1.2,
			ease: "power2.out",
		});

		gsap.from(".split-underline", {
			scrollTrigger: {
				trigger: ".split-container",
				start: "top bottom",
				toggleActions: "restart none none reset",
			},
			width: 0,
			delay: 0.8,
			duration: 1.2,
			ease: "power2.out",
		});

		gsap.from(splitContent.words, {
			scrollTrigger: {
				trigger: ".split-container",
				start: "top bottom",
				toggleActions: "restart none none reset",
			},
			opacity: 0,
			filter: "blur(6px)",
			duration: 1.2,
			stagger: {
				amount: 4,
			},
			ease: "power2.out",
			onComplete: () => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".split-container",
						start: "center center",
						end: "bottom top",
						toggleActions: "play none none reverse",
					},
				});

				tl.to(splitContent.lines, {
					y: -60,
					rotation: -1,
					duration: 0.45,
					stagger: { amount: 0.4 },
					ease: "back.inOut",
				}).to(splitContent.lines, {
					y: () => window.innerHeight,
					x: () => gsap.utils.random(-40, 40),
					rotation: () => gsap.utils.random(-15, 15),
					opacity: 0,
					duration: 0.8,
					stagger: { amount: 0.4, from: "random" },
					ease: "power4.in",
				});
			},
		});
	});

	return (
		<main className="w-full flex flex-col gap-16 overflow-x-hidden text-[#fffce1]">
			<div className="p-16 flex flex-col gap-16">
				<div className="flex flex-col gap-8 w-full" ref={scope}>
					<h1 className="text-3xl  font-semibold">Animation Basics</h1>

					<div className="size-25 bg-amber-500 rounded-xl border-2 box" />
					<div className="size-25 bg-blue-500 rounded-xl border-2 box" />
				</div>

				<div className="flex flex-col gap-8">
					<h1 className="text-3xl  font-semibold">Timeline</h1>

					<div className="flex justify-evenly" ref={scopeTimeline}>
						<div className="size-25 bg-green-500 rounded-xl border-2 green" />
						<div className="size-25 bg-pink-500 rounded-xl border-2 pink" />
						<div className="size-25 bg-blue-500 rounded-xl border-2 blue" />
					</div>

					<div className="flex justify-center gap-8 pt-8 flex-wrap">
						<Button
							variant="secondary"
							className="text-lg p-4 w-32"
							onClick={() => tl.current?.play()}
						>
							<IconPlayerPlay />
							Play
						</Button>
						<Button
							variant="secondary"
							className="text-lg p-4 w-32"
							onClick={() => tl.current?.pause()}
						>
							<IconPlayerPause />
							Pause
						</Button>
						<Button
							variant="secondary"
							className="text-lg p-4 w-32"
							onClick={() => tl.current?.resume()}
						>
							<IconPlayerTrackNext />
							Resume
						</Button>
						<Button
							variant="secondary"
							className="text-lg p-4 w-32"
							onClick={() => tl.current?.restart()}
						>
							<IconRefresh />
							Restart
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-8">
					<h1 className="text-3xl  font-semibold">Interactions</h1>

					<span
						className="bg-pink-500 text-white rounded-4xl w-fit py-2 px-4 cursor-pointer flex gap-2 items-center button font-medium select-none"
						onMouseEnter={handleButtonMouseEnter}
						onMouseLeave={handleButtonMouseLeave}
						onClick={handleButtonClick}
					>
						Hover and Click Animations
						<IconArrowRight stroke={1.5} />
					</span>
				</div>

				<div className="flex flex-col gap-8 scroll-container">
					<h1 className="text-3xl  font-semibold">Scroll Trigger</h1>

					<div className="flex justify-evenly mt-8">
						<div className="size-25 bg-green-500 rounded-xl border-2 scroll-fade" />
						<div className="size-25 bg-pink-500 rounded-xl border-2 scroll-fade" />
						<div className="size-25 bg-blue-500 rounded-xl border-2 scroll-fade" />
					</div>
				</div>

				<div className="h-200 flex flex-col justify-between ball-container">
					<div className="flex flex-col gap-4">
						<p className="text-2xl font-semibold">Start</p>
						<div className="size-25 bg-blue-500 rounded-full border-2 ball" />
					</div>
					<p className="text-2xl font-semibold text-end">End</p>
				</div>
				<p className="text-3xl font-semibold  mt-8">Pin</p>
				<div className="h-600 mt-4 grid md:grid-cols-2 pin-container">
					<div className="pinned self-start">
						<p className="text-2xl font-semibold text-white">Mitaka & Yoru</p>
						<img src="/image.png" alt="poster" className="h-150" />
					</div>

					<div className="h-full flex flex-col justify-between">
						<p className="text-4xl font-semibold uppercase">
							Start of the pin element.
						</p>

						<p className="text-4xl font-semibold uppercase">
							Some random content here.
						</p>

						<p className="text-4xl font-semibold uppercase">
							End of the pin element.
						</p>
					</div>
				</div>
			</div>

			<h1 className="text-3xl  font-semibold px-16">Another Example of Pin</h1>

			<div className="w-full overflow-hidden">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i + 1}
						className="panel w-full h-svh relative"
						style={{ zIndex: i + 1 }}
					>
						<img
							src={`/panel_${i + 1}.jpg`}
							alt={`panel_${i + 1}`}
							className="w-full h-full object-cover object-center block"
						/>
					</div>
				))}
			</div>

			<div className="p-16 flex flex-col gap-16">
				<div className="min-h-svh">
					<h1 className="text-3xl font-semibold">Parallax</h1>

					<div
						className="grid md:grid-cols-3 gap-16 py-40"
						style={{
							zIndex: 50,
						}}
					>
						{Array.from({ length: 3 }).map((_, i) => (
							<AspectRatio
								ratio={2 / 3}
								key={i}
								className="w-full"
								data-speed={`0.${7 + i}`}
							>
								<img
									src={`/parallax_${i + 1}.jpg`}
									alt={`parallax-${i + 1}`}
									className="w-full h-full object-cover"
								/>
							</AspectRatio>
						))}
					</div>
				</div>

				<div
					className="min-h-svh bg-background md:pt-16 flex flex-col"
					style={{
						zIndex: 51,
					}}
				>
					<div className="flex grow md:p-32">
						<div className="flex grow overflow-hidden rounded-4xl relative">
							<div className="absolute inset-0 flex justify-center items-center">
								<h1 className="text-2xl md:text-6xl font-semibold z-51 text-white">
									Parallax Window
								</h1>
							</div>
							<AspectRatio
								ratio={16 / 9}
								className="inline-flex grow z-50"
								data-speed="0.87"
							>
								<img
									src="/parallax_window.jpg"
									alt="parallax_window"
									className="w-full h-full object-cover object-center"
								/>
							</AspectRatio>
						</div>
					</div>
				</div>

				<div className="overflow-hidden">
					<div className="min-h-svh flex flex-col gap-8 split-container">
						<span className="relative inline-block w-fit">
							<h1 className="text-5xl font-semibold split-heading leading-relaxed text-white">
								Split Text Plugin
							</h1>
							<span className="absolute inset-0 border-b-2 border-white -translate-y-1 split-underline" />
						</span>
						<p className="text-3xl text-white split-content leading leading-relaxed">
							Love is far more than the fleeting rush of infatuation often
							portrayed in fiction; it is a profound, active choice made day
							after day. At its core, it is the willingness to deeply understand
							and accept another person, embracing their imperfections as
							readily as their strengths. True love acts as both an anchor and a
							sail—grounding us in moments of hardship while encouraging us to
							grow into our best selves. It demands vulnerability, requiring us
							to strip away our defenses, yet it rewards that bravery with a
							profound sense of belonging and connection. Ultimately, love is
							not just a passive feeling that washes over you, but a continuous
							series of actions, patience, and commitments that build a shared
							reality rooted in mutual respect and empathy.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

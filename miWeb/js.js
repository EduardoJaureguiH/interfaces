import { animate } from 'https://cdn.jsdelivr.net/npm/animejs/+esm';

animate('.navbar-portfolio', {
	opacity: [0, 1],
	translateY: [-12, 0],
	duration: 550,
	ease: 'outQuad',
});

animate('.hero-section .small-label, .hero-section h1, .hero-section .hero-lead, .hero-section .btn, .profile-photo', {
	opacity: [0, 1],
	translateY: [20, 0],
	delay: (_, i) => i * 90,
	duration: 700,
	ease: 'outQuad',
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				animate(entry.target, {
					opacity: [0, 1],
					translateY: [28, 0],
					duration: 650,
					ease: 'outQuad',
				});

				observer.unobserve(entry.target);
			});
		},
		{
			threshold: 0.15,
			rootMargin: '0px 0px -8% 0px',
		}
	);

	revealElements.forEach((element) => {
		revealObserver.observe(element);
	});
} else {
	animate('.reveal', {
		opacity: [0, 1],
		translateY: [28, 0],
		duration: 650,
		ease: 'outQuad',
	});
}

document.querySelectorAll('.skill-pill, .project-card').forEach((element) => {
	element.addEventListener('mouseenter', () => {
		animate(element, {
			scale: [1, 1.04],
			duration: 180,
			ease: 'outQuad',
		});
	});

	element.addEventListener('mouseleave', () => {
		animate(element, {
			scale: [1.04, 1],
			duration: 180,
			ease: 'outQuad',
		});
	});
});

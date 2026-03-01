import { animate, onScroll } from 'animejs';

// Archivo principal de interacciones: animaciones de entrada, scroll, hover y menú lateral

// Referencias principales del DOM para aplicar animaciones e interacciones
const main = document.querySelector('main');
const navbar = document.querySelector('.navbar');
const footer = document.querySelector('#site-footer');
const footerLinks = document.querySelectorAll('.footer-links a');
const hero = document.querySelector('#hero-store');
const heroCard = document.querySelector('#hero-store .card');
const heroButtons = document.querySelectorAll('#hero-store .btn');
const categoryPills = document.querySelectorAll('.category-pill');
const productCards = document.querySelectorAll('.product-card');
const contacto = document.querySelector('#contacto .bg-light');
const offerBanner = document.querySelector('#oferta .alert');
const sectionHoverTitle = document.querySelector('.section-hover-title');
const revealSections = document.querySelectorAll('#categorias, #productos, #oferta, #contacto');
const sideMenu = document.querySelector('#sideMenu');
const sideMenuOverlay = document.querySelector('#sideMenuOverlay');
const openSideMenuButton = document.querySelector('#openSideMenu');
const closeSideMenuButton = document.querySelector('#closeSideMenu');
const sideMenuLinks = document.querySelectorAll('.side-menu-link');

// Estado interno para controlar si el panel lateral está abierto
let isSideMenuOpen = false;

// Abre el menú lateral con animación de panel + overlay + enlaces en cascada
const openSideMenu = () => {
	if (!sideMenu || !sideMenuOverlay || isSideMenuOpen) {
		return;
	}

	isSideMenuOpen = true;
	sideMenu.style.visibility = 'visible';
	sideMenuOverlay.style.pointerEvents = 'auto';
	sideMenu.setAttribute('aria-hidden', 'false');
	sideMenuOverlay.setAttribute('aria-hidden', 'false');

	animate(sideMenuOverlay, {
		opacity: [0, 1],
		duration: 250,
		ease: 'outQuad',
	});

	animate(sideMenu, {
		translateX: ['100%', '0%'],
		duration: 420,
		ease: 'outExpo',
	});

	animate('.side-menu-link', {
		opacity: [0, 1],
		translateX: [20, 0],
		delay: (_, index) => 120 + index * 70,
		duration: 300,
		ease: 'outQuad',
	});
};

// Cierra el menú lateral con animación inversa
const closeSideMenu = () => {
	if (!sideMenu || !sideMenuOverlay || !isSideMenuOpen) {
		return;
	}

	isSideMenuOpen = false;

	animate(sideMenuOverlay, {
		opacity: [1, 0],
		duration: 220,
		ease: 'outQuad',
	});

	animate(sideMenu, {
		translateX: ['0%', '100%'],
		duration: 340,
		ease: 'inQuad',
	});

	animate('.side-menu-link', {
		opacity: [1, 0],
		translateX: [0, 16],
		duration: 180,
		ease: 'inQuad',
	});

	window.setTimeout(() => {
		sideMenu.style.visibility = 'hidden';
		sideMenuOverlay.style.pointerEvents = 'none';
		sideMenu.setAttribute('aria-hidden', 'true');
		sideMenuOverlay.setAttribute('aria-hidden', 'true');
	}, 340);
};

// Animación inicial de entrada de la página
if (main) {
	animate(main, {
		opacity: [0, 1],
		translateY: [20, 0],
		duration: 700,
		ease: 'outQuad',
	});

	// Efecto parallax del fondo ligado al scroll con umbrales numéricos
	animate('body', {
		backgroundPositionY: ['0px', '180px'],
		ease: 'linear',
		autoplay: onScroll({
			target: 'main',
			enter: 0.15,
			leave: 1,
			sync: true,
		}),
	});
}

// Entrada suave de la barra de navegación
if (navbar) {
	animate(navbar, {
		opacity: [0, 1],
		translateY: [-16, 0],
		duration: 650,
		ease: 'outQuad',
	});
}

// Animación escalonada de los elementos del hero
if (hero) {
	animate('#hero-store .badge, #hero-store h1, #hero-store p, #hero-store a, #hero-store .card', {
		opacity: [0, 1],
		translateY: [18, 0],
		delay: (_, i) => i * 110,
		duration: 650,
		ease: 'outQuad',
	});
}

// Movimiento flotante continuo de la tarjeta del hero
if (heroCard) {
	animate(heroCard, {
		translateY: [0, -8, 0],
		duration: 3200,
		loop: true,
		ease: 'inOutSine',
	});
}

// Efecto hover de botones del hero
heroButtons.forEach((button) => {
	button.addEventListener('mouseenter', () => {
		animate(button, {
			scale: [1, 1.05],
			duration: 220,
			ease: 'outQuad',
		});
	});

	button.addEventListener('mouseleave', () => {
		animate(button, {
			scale: [1.05, 1],
			duration: 220,
			ease: 'outQuad',
		});
	});
});

// Se ocultan al inicio para revelarlas cuando entren en viewport
revealSections.forEach((section) => {
	section.style.opacity = '0';
});

// Observer nativo para revelar secciones al hacer scroll
const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			}

			const section = entry.target;

			// Entrada base común para cada sección observada
			animate(section, {
				opacity: [0, 1],
				translateY: [30, 0],
				duration: 620,
				ease: 'outQuad',
			});

			// Animaciones específicas según sección
			if (section.id === 'categorias' && categoryPills.length > 0) {
				animate('.category-pill', {
					opacity: [0, 1],
					scale: [0.9, 1],
					delay: (_, i) => i * 80,
					duration: 420,
					ease: 'outQuad',
				});
			}

			if (section.id === 'productos' && productCards.length > 0) {
				animate('.product-card', {
					opacity: [0, 1],
					translateY: [26, 0],
					delay: (_, i) => 140 + i * 120,
					duration: 650,
					ease: 'outQuad',
				});
			}

			if (section.id === 'oferta' && offerBanner) {
				animate(offerBanner, {
					opacity: [0, 1],
					scale: [0.98, 1],
					duration: 550,
					ease: 'outQuad',
				});
			}

			if (section.id === 'contacto' && contacto) {
				animate(contacto, {
					opacity: [0, 1],
					scale: [0.98, 1],
					duration: 600,
					ease: 'outQuad',
				});
			}

			// Deja de observar la sección una vez animada
			sectionObserver.unobserve(section);
		});
	},
	{ threshold: 0.25 }
);

// Activa observación de cada sección objetivo
revealSections.forEach((section) => {
	sectionObserver.observe(section);
});

// Hover sobre tarjetas de producto (suben y escalan)
productCards.forEach((card) => {
	card.addEventListener('mouseenter', () => {
		animate(card, {
			translateY: [0, -10],
			scale: [1, 1.02],
			duration: 240,
		ease: 'outQuad',
	});
	});
});

// Vuelta al estado inicial al salir del hover en tarjetas
productCards.forEach((card) => {
	card.addEventListener('mouseleave', () => {
		animate(card, {
			translateY: [-10, 0],
			scale: [1.02, 1],
			duration: 240,
		ease: 'outQuad',
	});
});
});

// Convierte el título en letras sueltas para animarlas en hover
if (sectionHoverTitle && !sectionHoverTitle.querySelector('.title-letter')) {
	const titleText = sectionHoverTitle.textContent?.trim() || '';
	sectionHoverTitle.style.cursor = 'pointer';

	if (titleText) {
		sectionHoverTitle.textContent = '';

		for (const character of titleText) {
			const letter = document.createElement('span');
			letter.className = 'title-letter';
			letter.style.display = 'inline-block';
			letter.textContent = character === ' ' ? '\u00A0' : character;
			sectionHoverTitle.appendChild(letter);
		}

		// Efecto ondulación de letras al pasar el ratón
		sectionHoverTitle.addEventListener('mouseenter', () => {
			animate('.title-letter', {
				translateY: [0, -8, 0],
				delay: (_, i) => i * 45,
				duration: 450,
				ease: 'outQuad',
			});
		});
	}
}

// Efecto de "respiración" en el banner de ofertas
if (offerBanner) {
	animate(offerBanner, {
		scale: [1, 1.015, 1],
		duration: 2800,
		loop: true,
		ease: 'outQuad',
	});
}

// Entrada suave del footer
if (footer) {
	animate(footer, {
		opacity: [0, 1],
		translateY: [30, 0],
		duration: 900,
		ease: 'outQuad',
	});
}

// Hover en enlaces del footer
footerLinks.forEach((link) => {
	link.addEventListener('mouseenter', () => {
		animate(link, {
			scale: [1, 1.08],
			duration: 180,
			ease: 'outQuad',
		});
	});

	link.addEventListener('mouseleave', () => {
		animate(link, {
			scale: [1.08, 1],
			duration: 180,
			ease: 'outQuad',
		});
	});
});

// Eventos de apertura/cierre del menú lateral
openSideMenuButton?.addEventListener('click', openSideMenu);
closeSideMenuButton?.addEventListener('click', closeSideMenu);
sideMenuOverlay?.addEventListener('click', closeSideMenu);

// Cierra menú al navegar y anima hover de enlaces del panel lateral
sideMenuLinks.forEach((link) => {
	link.addEventListener('click', closeSideMenu);
	link.addEventListener('mouseenter', () => {
		animate(link, {
			translateX: [0, 8],
			duration: 160,
			ease: 'outQuad',
		});
	});

	link.addEventListener('mouseleave', () => {
		animate(link, {
			translateX: [8, 0],
			duration: 160,
			ease: 'outQuad',
		});
	});
});

// Cierra el menú con tecla Escape
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		closeSideMenu();
	}
});
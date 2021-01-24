document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideContent() {
		tabsContent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');
		});
	}
	function showContent(i = 0) {
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
	}
	hideContent();
	showContent();

	tabsParent.addEventListener('click', event => {
		const target = event.target;
		tabs.forEach((item, i) => {
			if (target.matches(".tabheader__item")) {
				item.classList.remove("tabheader__item_active");
			}
			if (target && target == item) {
				hideContent();
				showContent(i);
				item.classList.add("tabheader__item_active");
			}
		});
	});

	const endTimeOfSale = '2021-01-29';

	function timeLeft(deadline) {
		const difference = Date.parse(deadline) - Date.parse(new Date()),
			days = Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours = Math.floor(difference / (1000 * 60 * 60) % 24),
			minutes = Math.floor(difference / (1000 * 60) % 60),
			seconds = Math.floor(difference / 1000 % 60);
		return {
			'total': difference,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}
	function giveZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		}
		else {
			return num;
		}
	}
	function setClock() {
		const t = timeLeft(endTimeOfSale),
			timer = document.querySelector('.timer');
		timer.querySelector('#days').innerHTML = giveZero(t.days);
		timer.querySelector('#hours').innerHTML = giveZero(t.hours);
		timer.querySelector('#minutes').innerHTML = giveZero(t.minutes);
		timer.querySelector('#seconds').innerHTML = giveZero(t.seconds);
		setInterval(setClock, 1000);
		if (t.total <= 0) {
			clearInterval();
		}
	}


	setClock();

	const modalBtns = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalClose = document.querySelector('[data-close]');


	modalBtns.forEach(btn => {
		btn.addEventListener('click', openModal)
	});
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(timeInterval);
	}
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}
	modalClose.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (key) => {
		if (key.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// const timeInterval = setInterval(openModal, 5000);


	function checker() {
		if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', checker);
		}
	}

	window.addEventListener('scroll', checker);


	class DymanicCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.scr = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.classes = classes;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
		}


		createElement() {
			const div = document.createElement('div');
			if (this.classes.length === 0) {
				this.div = 'menu__item';
				div.classList.add(this.div);
			}
			else {
				this.classes.forEach(className => div.classList.add(className));
			}
			div.innerHTML = `
					<img src=${this.scr} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
	`;
			this.parent.append(div);
		}
	}

	new DymanicCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		229,
		'.menu .container',
		'menu__item'
	).createElement();
	new DymanicCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню "Премиум"',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		550,
		'.menu .container',
		'menu__item'
	).createElement();
	new DymanicCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за cчет тофу и импортных вегетарианских стейков',
		340,
		'.menu .container',
		'menu__item'
	).createElement();
});



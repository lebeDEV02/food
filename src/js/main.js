document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideContent() {
		tabsContent.forEach(item => {
			item.classList.remove('tabcontent_active', 'fade');
			item.classList.add('tabcontent_hide');
		});
	}
	function showContent(i = 0) {
		tabsContent[i].classList.remove('tabcontent_hide');
		tabsContent[i].classList.add('tabcontent_active', 'fade');
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
});

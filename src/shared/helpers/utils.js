import dayjs from 'dayjs';
import { clearTimeout } from 'timers';

/**
 *
 * @param {Date} d
 * @returns {Boolean}
 */
export function isValidDate(d) {
	const dt = new Date(d);
	return dt instanceof Date && !isNaN(dt);
}

export function generateAlphabet(firstChart = 'A', total = 26) {
	return [...Array(total)].map((_, i) =>
		String.fromCharCode(firstChart.charCodeAt(0) + i),
	);
}

export const groupByAlphabet = (key) => (array) =>
	array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key];
		const newObject = objectsByKeyValue;
		newObject[value] = (newObject[value] || []).concat(obj);
		return newObject;
	}, {});

export function priceFormat(price = 0, currency = 'Rp') {
	let newPrice = price;
	if (newPrice !== null) {
		newPrice = newPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
		return `${currency} ${newPrice}`;
	}
	return '';
}

export function dateFormat(date = null, formatDate = 'DD-MM-YYYY') {
	if (date !== null) {
		let newDate = dayjs(date).format(formatDate);

		if (formatDate === 'DD MMM YYYY') {
			newDate = newDate.replace(/May/g, 'Mei');
			newDate = newDate.replace(/Aug/g, 'Agu');
			newDate = newDate.replace(/Oct/g, 'Okt');
			newDate = newDate.replace(/Dec/g, 'Des');
		}

		if (formatDate.includes('dddd')) {
			newDate = newDate.replace(/Sunday/g, 'Minggu');
			newDate = newDate.replace(/Monday/g, 'Senin');
			newDate = newDate.replace(/Tuesday/g, 'Selasa');
			newDate = newDate.replace(/Wednesday/g, 'Rabu');
			newDate = newDate.replace(/Thursday/g, 'Kamis');
			newDate = newDate.replace(/Friday/g, 'Jumat');
			newDate = newDate.replace(/Saturday/g, 'Sabtu');
		}

		return `${newDate}`;
	}
	return '';
}

/**
 * Get Date And Hour From Time Str Api Data (createdAt, updatedAt, etc)
 * @param {String} time in string | createdAt, updatedAt
 * @returns {{ date, hour }} {{ date, hour }}
 */
export function getDateAndHourFromTimeStr(timeStr) {
	if (!timeStr) return { date: '', hour: '' };
	const splitedWords = timeStr.split(' ');
	const date = splitedWords[0] || '';
	const hour = splitedWords.slice(1, 3).join(' ') || '';
	return { date, hour };
}

export function percentage(number = 0, total = 0, type = '') {
	const result = ((number / total) * 100).toFixed(0);
	return type === 'display' ? `${result}%` : result;
}

export function getDayName(date) {
	if (!date) {
		return '';
	}

	const day = parseInt(dayjs(date).format('d'), 10);

	switch (day) {
		case 0:
			return 'Minggu';
		case 1:
			return 'Senin';
		case 2:
			return 'Selasa';
		case 3:
			return 'Rabu';
		case 4:
			return 'Kamis';
		case 5:
			return 'Jumat';
		case 6:
			return 'Sabtu';

		default:
			return '';
	}
}

export function getMonthName(date) {
	if (!date) {
		return '';
	}

	const month = parseInt(dayjs(date).format('M'), 10);

	switch (month) {
		case 1:
			return 'Januari';
		case 2:
			return 'Februari';
		case 3:
			return 'Maret';
		case 4:
			return 'April';
		case 5:
			return 'Mei';
		case 6:
			return 'Juni';
		case 7:
			return 'Juli';
		case 8:
			return 'Agustus';
		case 9:
			return 'September';
		case 10:
			return 'Oktober';
		case 11:
			return 'November';

		default:
			return 'Desember';
	}
}

export function formatPaymentTimeout(date) {
	let result = '';
	if (date) {
		const orderDate = dateFormat(date, 'D');
		const orderDay = getDayName(date);
		const orderMonth = getMonthName(date).substring(0, 3);
		const orderTime = dateFormat(date, 'YYYY HH:mm');

		result = `${orderDay}, ${orderDate} ${orderMonth} ${orderTime} WIB`;
	}

	return result;
}

export function cleanUpParams(params = {}, excludeEmptyValue = true) {
	const result = {};

	Object.entries(params).forEach((param) => {
		if (excludeEmptyValue) {
			if (param[1]) result[param[0]] = param[1];
		} else {
			result[param[0]] = param[1];
		}
	});

	return result;
}

export function paramsToString(
	params = {},
	excludeEmptyValue = true,
	sort = true,
) {
	const cleanParams = cleanUpParams(params, excludeEmptyValue);
	const paramsArray = [];

	Object.entries(cleanParams).forEach((param) => {
		paramsArray.push(`${param[0]}=${param[1]}`);
	});

	if (sort) paramsArray.sort();

	return paramsArray.length ? `?${paramsArray.join('&')}` : '';
}

export function getDataCustom(target) {
	return target.dataset.custom && JSON.parse(target.dataset.custom);
}

export function groupArrayByFirstLetter(items) {
	return items.reduce((r, e) => {
		const letter = e.name[0].toUpperCase();
		// eslint-disable-next-line no-param-reassign
		if (!r[letter]) r[letter] = { letter, items: [e] };
		else r[letter].items.push(e);
		return r;
	}, {});
}

export function matchText(str, rule) {
	const escapeRegex = (oldstr) =>
		// eslint-disable-next-line no-useless-escape
		oldstr.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
	return new RegExp(`^${rule.split('*').map(escapeRegex).join('.*')}$`).test(
		str,
	);
}

export function findLengthOfCharInsideString(str, query) {
	const temp = new RegExp(query, 'g');
	return str.match(temp) && str.match(temp).length;
}

export function isPhoneNumber(value) {
	return Boolean(value.match(/^\s*(0|62)8\d{7,12}\s*$/));
}

export function isEmptyObject(obj) {
	// eslint-disable-next-line no-restricted-syntax
	for (const prop in obj) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
}

export function paramsToObj(params = '') {
	try {
		if (params) {
			return JSON.parse(
				`{"${decodeURI(params.replace(/&/g, '","').replace(/=/g, '":"'))}"}`,
			);
		}
		return {};
	} catch (error) {
		return {};
	}
}

export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

/**
 * Validate email format
 *
 * @param {String} email
 */
export function validateEmail(email) {
	// eslint-disable-next-line no-useless-escape
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/**
 * Validate phone number format
 *
 * @param {String} email
 */
export function validatePhoneNumber(phoneNumber) {
	// eslint-disable-next-line no-useless-escape
	const re = /^(\+{0,1}62|0)8\d{8,12}$/;
	return re.test(phoneNumber);
}
/**
 * Validate just number format
 *
 * @param {String} string
 */
export function validateJustNumber(string) {
	// eslint-disable-next-line no-useless-escape
	const re = /^\d+$/;
	return re.test(string);
}

/*
 * get <p></p> tag from html string
 * @param {String} content html string
 * @param {Number} total
 * @returns {String}
 */
export function getParagraph(content, total = 1) {
	const regex = /<p[^>]*>(.*?)<\/p>/gi;
	const result = content.match(regex);
	let newContent = '';
	if (result) {
		for (let idx = 0; idx < total; idx++) {
			if (result[idx]) {
				newContent += result[idx];
			}
		}
	}
	return newContent;
}
/*
 * Convert geocode response to map address format
 *
 * @param {Object} geocodeResult | geocode response
 */
export function convertGeocodeResultToMapAddress(geocodeResult) {
	return {
		placeId: (geocodeResult && geocodeResult.place_id) || null,
		title:
			geocodeResult && geocodeResult.formatted_address
				? geocodeResult.formatted_address.split(',')[0]
				: '',
		description: (geocodeResult && geocodeResult.formatted_address) || '',
		lat: geocodeResult.geometry.location.lat() || 0,
		long: geocodeResult.geometry.location.lng() || 0,
		isNeedRefetchPlace: true,
	};
}

/*
 * Convert google place response to map address format
 *
 * @param {Object} googlePlace | google place response
 */
export function convertGooglePlaceToMapAddress(googlePlace) {
	return {
		placeId: googlePlace.placeId,
		title: googlePlace.address,
		description: googlePlace.description,
		lat: googlePlace.latitude,
		long: googlePlace.longitude,
		subdistrict: googlePlace.subDistrict,
		district: googlePlace.district,
		city: googlePlace.city,
		province: googlePlace.province,
		zipCode: googlePlace.zipCode,
	};
}

/**
 * Get the string inside the parantheses of the sentence
 * @param {String} sentence
 */

export function getParenthesesWords(sentence = '') {
	const parenthesesStartIdx = sentence.indexOf('(');
	const parenthesesEndIdx = sentence.indexOf(')');
	const isAnyParentheses = parenthesesStartIdx >= 0;
	return isAnyParentheses
		? sentence.slice(parenthesesStartIdx + 1, parenthesesEndIdx)
		: '';
}

/**
 * Get Latest String Seperated By Dash
 * @param {String} string | string
 * @returns {String}
 */
export function getLatestStringSeperatedByDash(string) {
	let latestString = '';
	const splittedData = string.split(' - ');
	const splittedDataLength = splittedData.length;
	if (splittedDataLength > 1) {
		const lastSplittedDataIdx = splittedDataLength - 1;
		latestString = splittedData[lastSplittedDataIdx];
	}
	return latestString;
}

/**
 * @param {String} html
 * @returns {String} clean content (remove all tag except li, ul, ol, and a)
 */
export function getCleanContent(html) {
	const cleanContent = html.replace(/<(?!\/?()(?=>|\s.*>))\/?.*?>/gi, '');
	return !cleanContent ? null : cleanContent;
}

export function debounce(func, duration) {
	let timeout;

	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, duration);
	};
}

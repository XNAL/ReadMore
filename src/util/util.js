export default {
	debounce: (fn, delay, timeout) => {
		var timer = null;
		var last = new Date().getTime();
		delay = delay || 300;
		timeout = timeout || 300;
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(fn, delay);
			if (new Date().getTime() > last + timeout) {
				fn.apply(this, [].slice.call(Array, arguments));
				last = new Date().getTime();
				clearTimeout(timer);
			}
		}
	}
}

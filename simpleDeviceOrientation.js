/**
 * simpleDeviceOrientation: the simplest way to use 2d projection of user's device position
 *
 * @author Ruslan Sukhar (ruslan@sukhar.info)
 * @link https://github.com/rsukhar/simpleDeviceOrientation
 * @license MIT License
 */
window.simpleDeviceOrientation = {

	/**
	 * @var {Boolean} Determines if current device supports device orientation and the class can be used
	 */
	isAvailable: false,

	/**
	 * @var {Boolean} Determines if any event is being attached and handled at the moment
	 */
	isActive: false,

	/**
	 * @var {Array} The stack of events
	 */
	_events: [],

	init: function()
	{
		this.isAvailable = 'DeviceOrientationEvent' in window;
	},

	/**
	 * Add (bind) simplified device orientation event
	 * @param {Function} event fn(x, y), x and y both vary in range [0;1]
	 */
	addEvent: function(event)
	{
		if ( ! this.isAvailable) return;
		this._events.push(event);
		if ( ! this.isActive) this._start();
	},

	/**
	 * Remove (unbind) simplified device orientation event
	 * @param {Function} event
	 */
	removeEvent: function(event)
	{
		var index = this._events.indexOf(event);
		if (index === -1) return;
		this._events.splice(index, 1);
		if (this._events.length == 0 && this.isActive) this._stop();
	},

	/**
	 * Remove all events
	 */
	removeEvents: function()
	{
		this._events.length = 0;
		if (this.isActive) this._stop();
	},

	/**
	 * Start device orientation listening
	 * @private
	 */
	_start: function()
	{
		window.addEventListener("deviceorientation", this._eventListener);
		this.isActive = true;
	},

	/**
	 * Stop device orientation listening
	 * @private
	 */
	_stop: function()
	{
		window.removeEventListener("deviceorientation", this._eventListener);
		this.isActive = false;
	},

	/**
	 * The function that will be attached to deviceorientation event
	 * @param {Object} e
	 * @private
	 */
	_eventListener: function(e){
		var gamma = e.gamma,
			beta = e.beta,
			x, y;
		switch (window.orientation){
			case -90:
				gamma = Math.max(-45, Math.min(45, gamma - 20));
				beta = Math.max(-45, Math.min(45, beta));
				x = (beta + 45) / 90;
				y = (45 - gamma) / 90;
				break;
			case 90:
				gamma = Math.max(-45, Math.min(45, gamma + 20));
				beta = Math.max(-45, Math.min(45, beta));
				x = (45 - beta) / 90;
				y = (gamma + 45) / 90;
				break;
			case 180:
				gamma = Math.max(-45, Math.min(45, gamma));
				beta = Math.max(-45, Math.min(45, beta + 20));
				x = (gamma + 45) / 90;
				y = (beta + 45) / 90;
				break;
			case 0:
			default:
				// Upside down
				if (gamma < -90 || gamma > 90) gamma = Math.abs(e.gamma)/e.gamma * (180 - Math.abs(e.gamma));
				gamma = Math.max(-45, Math.min(45, gamma));
				beta = Math.max(-45, Math.min(45, beta - 20));
				x = (45 - gamma) / 90;
				y = (45 - beta) / 90;
				break;
		}

		for (var i = 0, l = window.simpleDeviceOrientation._events.length; i < l; i++){
			try {
				window.simpleDeviceOrientation._events[i].apply(this, [x, y]);
			} catch(e) {
				if (window.console && window.console.error) console.error(e);
			}
		}
	}
};

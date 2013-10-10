simpleDeviceOrientation
=======================

The most simple way to handle user's device position in JavaScript.
No more alpha/betta/gamma! Just x and y, which are counted properly based on device position and orientation.

Usage
-----

**Check ability to use device orientation:**

```javascript
simpleDeviceOrientation.isAvailable
```

**Add (bind) simplified device orientation event:**

```javascript
simpleDeviceOrientation.addEvent(function(x, y){
	// x and y are being changed in range from 0 to 1
});
```

**Remove (unbind) simplified device orientation event:**

```javascript
simpleDeviceOrientation.removeEvent(fn);
```

**Remove all events:**

```javascript
simpleDeviceOrientation.removeEvents();
```

Example
-------

*Note: you need device, that supports Device Orientation event to view the example!*

http://jsfiddle.net/Sf8me/show/light/

![http://jsfiddle.net/Sf8me/show/light/](http://qrcoder.ru/code/?http%3A%2F%2Fjsfiddle.net%2FSf8me%2Fshow%2Flight%2F&10&0)

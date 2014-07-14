turf-distance
=============
[![Build Status](https://travis-ci.org/Turfjs/turf-distance.svg?branch=master)](https://travis-ci.org/Turfjs/turf-distance)

Calculates the distance between two point features in degrees, radians, miles, or kilometers. This uses the haversine formula to account for global curvature.

###Install

```sh
npm install turf-distance
```

###Parameters

|name|description|
|---|---|
|point1|point feature|
|point2|point feature|
|units|'miles' or 'kilometers'|

###Usage

```js
distance(point1, point2, units)
```

###Example

```javascript
var distance = require('turf-distance')
var point = require('turf-point')

var point1 = point(-75.343, 39.984)
var point2 = point(-75.534, 39.123)
var units = 'miles' // or 'kilometers', 'degrees', 'radians'

var distanced = distance(point1, point2, units)

console.log(distanced)
```
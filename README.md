turf-distance
=============
[![Build Status](https://travis-ci.org/Turfjs/turf-distance.svg?branch=master)](https://travis-ci.org/Turfjs/turf-distance)

Calculates the distance between two point features in degrees, radians, miles, or kilometers. This uses the haversine formula to account for global curvature.

```javascript
var distance = require('turf-distance')
var point = require('turf-point')

var point1 = point(-75.343, 39.984)
var point2 = point(-75.534, 39.123)
var unit = 'miles' // or 'kilometers', 'degrees', 'radians'

var distanced = distance(point1, point2, unit)

console.log(distanced)
```
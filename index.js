var invariant = require('turf-invariant');
//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html

/**
 * Calculates the distance between two {@link Point|points} in degress, radians,
 * miles, or kilometers. This uses the
 * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 *
 * @module turf/distance
 * @category measurement
 * @param {Feature<Point>} from origin point
 * @param {Feature<Point>} to destination point
 * @param {String} [units=kilometers] can be degrees, radians, miles, or kilometers
 * @return {Number} distance between the two points
 * @example
 * var point1 = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [-75.343, 39.984]
 *   }
 * };
 * var point2 = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [-75.534, 39.123]
 *   }
 * };
 * var units = "miles";
 *
 * var points = {
 *   "type": "FeatureCollection",
 *   "features": [point1, point2]
 * };
 *
 * //=points
 *
 * var distance = turf.distance(point1, point2, units);
 *
 * //=distance
 */
module.exports = function(point1, point2, units) {
  invariant.featureOf(point1, 'Point', 'distance');
  invariant.featureOf(point2, 'Point', 'distance');
  var coordinates1 = point1.geometry.coordinates;
  var coordinates2 = point2.geometry.coordinates;

  var dLat = toRad(coordinates2[1] - coordinates1[1]);
  var dLon = toRad(coordinates2[0] - coordinates1[0]);
  var lat1 = toRad(coordinates1[1]);
  var lat2 = toRad(coordinates2[1]);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) *
    Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var R;
  switch (units) {
    case 'miles':
    case 'kilometers':
    case 'kilometres':
    case 'meters':
    case undefined:
      R = getEarthRadius(lat1, units);
      break;
    case 'degrees':
      R = 57.2957795;
      break;
    case 'radians':
      R = 1;
      break;
    default:
      throw new Error('unknown option given to "units"');
  }

  // Round result.
  var distance = R * c;

  switch (units) {
    case 'miles':
    case 'kilometers':
    case 'kilometres':
    case undefined:
      distance = Math.floor(distance * 1000) / 1000;
      break;

    case 'meters':
      distance = Math.floor(distance);
      break;

    default:
      break;
  }

  return Number(distance);
};

function toRad(degree) {
  return degree * Math.PI / 180;
}

function kmToMiles(kilometers) {
  return kilometers * 0.621371192;
}

function metersToMiles(meters) {
  return meters * 0.000621371192;
}

function getEarthRadius(latdeg, units) {

  var radiusMajorInMeters = 6378137.0;
  var radiusMinorInMeters = 6356752.3142;
  var radiusMajor = 0;
  var radiusMinor = 0;

  switch (units) {
    case 'miles':
      radiusMajor = metersToMiles(radiusMajorInMeters);
      radiusMinor = metersToMiles(radiusMinorInMeters);
      break;
    case 'kilometers':
    case 'kilometres':
    case undefined:
      radiusMajor = radiusMajorInMeters / 1000;
      radiusMinor = radiusMinorInMeters / 1000;
      break;
    case 'meters':
      radiusMajor = radiusMajorInMeters;
      radiusMinor = radiusMinorInMeters;
      break;
    default:
      throw new Error('unknown option given to "units"');
  }

  // http://en.wikipedia.org/wiki/Earth_radius
  var An = radiusMajor * radiusMajor * Math.cos(latdeg);
  var Bn = radiusMinor * radiusMinor * Math.sin(latdeg);
  var Ad = radiusMajor * Math.cos(latdeg);
  var Bd = radiusMinor * Math.sin(latdeg);

  return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd));
}

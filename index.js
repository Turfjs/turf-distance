var invariant = require('turf-invariant');
//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html

module.exports = distance;
module.exports.arrayDistance = arrayDistance;
module.exports.getR = getR;
/**
 * Calculates the distance between two {@link Point|points} in degress, radians,
 * miles, or kilometers. This uses the
 * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 * Internally this uses {@lint arrayDistance}.
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
function distance(point1, point2, units) {
  invariant.featureOf(point1, 'Point', 'distance');
  invariant.featureOf(point2, 'Point', 'distance');
  var coordinates1 = point1.geometry.coordinates;
  var coordinates2 = point2.geometry.coordinates;
  var R = getR(units);

  return arrayDistance(coordinates1, coordinates2, R);
}

/**
 * The meat of the module, doing the actual work after {@link distance} checks params.
 *
 * @alias arrayDistance
 * @param {Array<number>} from origin point
 * @param {Array<number>} to destination point
 * @param {number} constant R for conversion from radians, obtain from {@link getR}.
 * @return {Number} distance between the two points

 */
function arrayDistance(coordinates1, coordinates2, R) {
  var dLat = toRad(coordinates2[1] - coordinates1[1]);
  var dLon = toRad(coordinates2[0] - coordinates1[0]);
  var lat1 = toRad(coordinates1[1]);
  var lat2 = toRad(coordinates2[1]);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var distance = R * c;
  return distance;
}
/**
 * Obtain the apropriate modifier for converting from radians.
 *
 * @alias getR
 * @param {String} [units=kilometers] can be degrees, radians, miles, or kilometers
 * @return {Number} constant for converting from radians to appropriate units.
 *
*/
function getR(units) {
  switch(units) {
    case 'miles':
      return 3960;
    case 'kilometers':
    case 'kilometres':
      return 6373;
    case 'degrees':
      return 57.2957795;
    case 'radians':
      return 1;
    case undefined:
      return 6373;
    default:
      throw new Error('unknown option given to "units"');
  }
}

function toRad(degree) {
  return degree * Math.PI / 180;
}

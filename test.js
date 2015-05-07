var test = require('tape');
var distance = require('./');

test('distance', function(t) {
  var pt1 = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-75.343, 39.984]
    }
  };
  var pt2 = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-75.534, 39.123]
    }
  };

  // Center point
  var pt3 = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-73.5719678, 45.5260794]
    }
  };

  // On the circle radius (center + 400 meters + 0 degres)
  var pt4 = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-73.57196780000001, 45.52968474026626]

    }
  };

  // On the circle radius too (center + 400 meters + 270 degres)
  var pt5 = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-73.57711398872225, 45.52607928446446]
    }
  };

  /* Test # 01 */
  t.equal(distance(pt1, pt2, 'miles'), 60.337, 'miles');
  /* Test # 02 */
  t.equal(distance(pt1, pt2, 'kilometers'), 97.103, 'kilometers');
  /* Test # 03 */
  t.equal(distance(pt1, pt2, 'kilometres'), 97.103, 'kilometres');
  /* Test # 04 */
  t.equal(distance(pt1, pt2, 'radians'), 0.015245501024842149, 'radians');
  /* Test # 05 */
  t.equal(distance(pt1, pt2, 'degrees'), 0.8735028650863799, 'degrees');
  /* Test # 06 */
  t.equal(distance(pt1, pt2), 97.103, 'default=kilometers');
  /* Test # 07 */
  t.equal(distance(pt3, pt4, 'meters'), 400, 'meters');
  /* Test # 08 */
  t.equal(distance(pt3, pt4, 'kilometers'), 0.400, 'kilometers');
  /* Test # 09 */
  t.equal(distance(pt3, pt5, 'meters'), 400, 'meters');
  /* Test # 10 */
  t.equal(distance(pt3, pt5, 'kilometers'), 0.400, 'kilometers');
  /* Test # 11 */
  t.equal(distance(pt3, pt4, 'meters'), distance(pt3, pt5, 'meters'));
  /* Test # 12 */
  t.equal(distance(pt3, pt4, 'kilometers'), distance(pt3, pt5, 'kilometers'));

  t.throws(function() {
    distance(pt1, pt2, 'blah');
  }, 'unknown option given to units');

  t.end();
});

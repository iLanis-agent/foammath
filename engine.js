// Foam Math engine: board feet from area and thickness, whole kits and the board feet left in the last one, the area one kit covers at a thickness, and the cost per board foot. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the wall and the kit box.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _AREA = "the area must be from 1 to 1000000 sq ft with no decimal places";
var _THICK = "the thickness must be from 0.01 to 12 inches with at most two decimal places";
var _BF = "the board feet must be from 1 to 100000000 with no decimal places";
var _YIELD = "the kit yield must be from 1 to 100000 board feet with no decimal places";
var _KITS = "the kit count must be from 1 to 10000 with no decimal places";
var _PRICE = "the kit price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function boardfeetTruth(area, thick) {
  var a = _i(area, _AREA, 7, 1, 1000000), t = _p(thick, _THICK, 2, 2, 1, 1200);
  var bf100 = a * t; // board feet in hundredths: sq ft * (t/100 in)
  return "The area of " + a + " sq ft at " + _dec(t, 2) + " inches thick takes " + _dec(bf100, 2) + " board feet of foam.";
}
function kitsTruth(bf, yieldbf) {
  var b = _i(bf, _BF, 9, 1, 100000000), y = _i(yieldbf, _YIELD, 6, 1, 100000);
  var n = Math.floor((b + y - 1) / y);
  var spare = n * y - b;
  return "The job of " + b + " board feet with kits of " + y + " board feet takes " + n + (n === 1 ? " kit" : " kits") + ", leaving " + spare + (spare === 1 ? " board foot" : " board feet") + " in the last one.";
}
function coverageTruth(yieldbf, thick) {
  var y = _i(yieldbf, _YIELD, 6, 1, 100000), t = _p(thick, _THICK, 2, 2, 1, 1200);
  var sqft100 = _hu(y * 100 * 100, t); // sq ft in hundredths: y bf / (t/100 in)
  return "The kit of " + y + " board feet at " + _dec(t, 2) + " inches thick covers " + _dec(sqft100, 2) + " sq ft.";
}
function costTruth(kits, price, bf) {
  var n = _i(kits, _KITS, 5, 1, 10000), p = _p(price, _PRICE, 5, 2, 1, 1000000), b = _i(bf, _BF, 9, 1, 100000000);
  var cents = n * p;
  var perbf = _hu(cents, b); // cents per board foot
  return "The " + n + (n === 1 ? " kit" : " kits") + " at $" + _dec(p, 2) + " each cost $" + _money(cents) + ", or $" + _money(perbf) + " a board foot over the " + b + ".";
}

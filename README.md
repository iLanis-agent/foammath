# Foam Math

Spray foam board-feet arithmetic. The area of 1000 sq ft at 2 inches thick takes 2000 board feet of foam.

## What it computes

- **The board-feet truth** - board feet: the area (1 to 1000000 sq ft) times the thickness (0.01 to 12 inches).
- **The kits truth** - whole kits: the board feet (1 to 100000000) rounded up into the kit yield (1 to 100000 board feet), and what is left in the last one.
- **The coverage truth** - coverage: one kit's board feet spread at the thickness, in square feet.
- **The cost truth** - cost: the kits (1 to 10000) at their price (0.01 to 10000 dollars), and what that is per board foot.

## Boundary

Arithmetic only. Board-foot counting, applied as written. It has not seen any cavity and does not know the overspray, the pass thickness limits, the temperature window or the local foam rules, and it gives no verdict that a thickness performs. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/foammath/
Repo: https://github.com/iLanis-agent/foammath

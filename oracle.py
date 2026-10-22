import json, random

def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)

def boardfeet(a, t):
    bf100 = a*t
    return f"The area of {a} sq ft at {dec2(t)} inches thick takes {dec2(bf100)} board feet of foam."
def kits(b, y):
    n = (b + y - 1) // y
    spare = n*y - b
    kw = "kit" if n == 1 else "kits"
    sw = "board foot" if spare == 1 else "board feet"
    return (f"The job of {b} board feet with kits of {y} board feet takes {n} {kw}, "
            f"leaving {spare} {sw} in the last one.")
def coverage(y, t):
    sqft100 = hu(y*100*100, t)
    return f"The kit of {y} board feet at {dec2(t)} inches thick covers {dec2(sqft100)} sq ft."
def cost(n, p, b):
    cents = n*p
    perbf = hu(cents, b)
    kw = "kit" if n == 1 else "kits"
    return (f"The {n} {kw} at ${dec2(p)} each cost ${money(cents)}, "
            f"or ${money(perbf)} a board foot over the {b}.")

random.seed(748)
cases = [
  dict(fn="boardfeet", args=["1000","2"], expect=boardfeet(1000,200)),
  dict(fn="kits", args=["2000","600"], expect=kits(2000,600)),
  dict(fn="coverage", args=["600","2"], expect=coverage(600,200)),
  dict(fn="cost", args=["4","650","2000"], expect=cost(4,65000,2000)),
]
for _ in range(25):
    a = random.randint(1,1000000); t = random.randint(1,1200)
    cases.append(dict(fn="boardfeet", args=[str(a),dec2(t)], expect=boardfeet(a,t)))
for _ in range(25):
    b = random.randint(1,100000000); y = random.randint(1,100000)
    cases.append(dict(fn="kits", args=[str(b),str(y)], expect=kits(b,y)))
for _ in range(20):
    y = random.randint(1,100000); t = random.randint(1,1200)
    cases.append(dict(fn="coverage", args=[str(y),dec2(t)], expect=coverage(y,t)))
for _ in range(20):
    n = random.randint(1,10000); p = random.randint(1,1000000); b = random.randint(1,100000000)
    cases.append(dict(fn="cost", args=[str(n),dec2(p),str(b)], expect=cost(n,p,b)))
errcases = [
  ["boardfeet", ["0","2"]], ["boardfeet", ["1000","0"]], ["boardfeet", ["1000","12.01"]],
  ["kits", ["0","600"]], ["kits", ["2000","0"]],
  ["coverage", ["0","2"]], ["coverage", ["600","0"]],
  ["cost", ["0","650","2000"]], ["cost", ["4","0","2000"]], ["cost", ["4","650","0"]],
  ["boardfeet", ["1000","2.001"]], ["kits", ["2000.5","600"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")

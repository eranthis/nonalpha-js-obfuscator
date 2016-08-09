_ = ~[];
_ = {
    a: {
        a: !![]+[], // "true"
        b: ![]+[],  // "false"
        c: []+{},   // "[object Object]"
        d: [][_]+[] // "undefined"
    },
    b: ++_,         // 0
    c: ++_,         // 1
    d: -~_++,       // 2
    e: -~_,         // 3
    f: -~++_        // 4
},
_.a.e = _.a.c[_.f+_.c] // c
    + _.a.c[_.c]       // o
    + _.a.d[_.c]       // n
    + _.a.b[_.e]       // s
    + _.a.a[_.b]       // t
    + _.a.a[_.c]       // r
    + _.a.d[_.b]       // u
    + _.a.c[_.f+_.c]   // c
    + _.a.a[_.b]       // t
    + _.a.c[_.c]       // o
    + _.a.a[_.c],      // r
_.g = [][_.a.e][_.a.e],
_.a.f = []+/[]/[_.a.e],    // "function RegExp() { [native code] }"
_.a.g = []+([]+[])[_.a.e], // "function String() { [native code] }"
_.a.h = _.a.a[_.b]       // t
    + _.a.c[_.c]         // o
    + _.a.g[_.c+_.f+_.f] // S
    + _.a.a[_.b]         // t
    + _.a.a[_.c]         // r
    + _.a.d[_.c+_.f]     // i
    + _.a.d[_.c]         // n
    + _.a.g[[]+_.c+_.f]; // g
_.a.i = _.a.a[_.a.b[_.d]+_.a.d[_.c+_.f]+_.a.d[_.c]+((_.d+_.e)*_.f)[_.a.h](_.e*(_.e+_.f))](), // <a href="undefined">true</a>
_.a.j = _.a.a[_.c] // r
    +_.a.a[_.e]    // e
    +_.a.a[_.b]    // t
    +_.a.a[_.d]    // u
    +_.a.a[_.c]    // r
    +_.a.d[_.c];   // n
_.a.k = []+_.g(_.a.j+_.a.c[_.e+_.f]+([]+~_.b)[_.b]+_.c+_.a.i[[]+_.d+(_.d+_.e)]+_.d)(), // -0.5
_.h = _.g(_.a.j+_.a.c[_.e+_.f]+_.a.a[_.e]+_.a.b[_.e]+_.a.c[_.f+_.c]+_.a.b[_.c]+_.a.f[[]+_.c+_.f]+_.a.a[_.e])(), // escape()
[]+_.h(' ')[_.b]
_.i = _.g(_.a.j+_.a.c[_.e+_.f]+_.a.a[_.d]+_.a.d[_.c]+_.a.a[_.e]+_.a.b[_.e]+_.a.c[_.f+_.c]+_.a.b[_.c]+_.a.f[[]+_.c+_.f]+_.a.a[_.e])(); // unescape()
_.a.l = []+_.h(' ')[_.b]; // %

console.log({
	' ' : _.a.c[_.e+_.f],
	'(' : _.a.g[_.e*(_.d+_.e)],
	')' : _.a.g[_.f*_.f],
	'{' : _.a.g[_.e*(_.e+_.e)],
	'}' : _.a.g[[]+_.e+_.f],
	'[' : _.a.g[[]+_.d+_.b],
	']' : _.a.g[[]+_.e+_.d],
	'<' : _.a.i[_.b],
	'>' : _.a.i[[]+_.c+(_.e*_.e)],
	'=' : _.a.i[_.e+_.f],
	'"' : _.a.i[_.f+_.f],
	'/' : _.a.i[[]+_.d+(_.d+_.e)],
	'-' : _.a.k[_.b],
	'.' : _.a.k[_.d],
	'0' : _.b,
	'1' : _.c,
	'2' : _.d,
	'3' : _.e,
	'4' : _.f,
	'5' : _.c+_.f,
	'6' : _.e+_.e,
	'7' : _.e+_.f,
	'8' : _.f+_.f,
	'9' : _.e*_.e,
	'E' : _.a.f[_.e*_.f],
	'O' : _.a.c[_.d*_.f],
	'R' : _.a.f[_.e*_.e],
	'S' : _.a.g[_.e*_.e],
	'a' : _.a.b[_.c],
	'b' : _.a.c[_.d],
	'c' : _.a.c[_.f+_.c],
	'd' : _.a.d[_.d],
	'e' : _.a.a[_.e],
	'f' : _.a.b[_.b],
	'g' : _.a.g[[]+_.c+_.f],
	'h' : _.i(_.a.l+(_.e+_.e)+(_.f+_.f)),
	'i' : _.a.d[_.c+_.f],
	'j' : _.a.c[_.e],
	'k' : _.i(_.a.l+(_.e+_.e)+_.a.c[_.d]),
	'l' : _.a.b[_.d],
	'm' : _.i(_.a.l+(_.e+_.e)+_.a.d[_.d]),
	'n' : _.a.d[_.c],
	'o' : _.a.c[_.c],
	'p' : _.a.f[[]+_.c+_.f],
	'q' : _.i(_.a.l+(_.e+_.f)+_.c),
	'r' : _.a.a[_.c],
	's' : _.a.b[_.e],
	't' : _.a.a[_.b],
	'u' : _.a.a[_.d],
	'v' : _.a.f[[]+_.d+(_.d+_.e)],
	'w' : _.i(_.a.l+(_.e+_.f)+(_.f+_.e)),
	'x' : _.a.f[_.e*_.f+_.c],
	'y' : _.i(_.a.l+(_.e+_.f)+(_.e*_.e)),
	'z' : _.i(_.a.l+(_.e+_.f)+_.a.b[_.c])
});
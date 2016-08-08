# Non-Alphanumeric JS obfuscator
This will convert javascript code to nearly un-reversable non-alphanumeric obfuscated code

## Starting code
```javascript
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
```

With these strings, we can figure out all availble characters
```javascript
'truefalse[object Object]undefined'.split``.filter((e,i,s) => s.indexOf(e) === i).sort((a, b) => a.localeCompare(b));
```

Available: (space) [ ] a b c d e f i j l n o O r s t u
Missing: g h k m p q v w x y z

## Callable function
The code `[]['constructor']['constructor']` will give us an callable function, so let's create the word 'constructor'. Luckily, the strings 'true', 'false', '[object Object]' and 'undefined' contain all the letters we need.
```javascript
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
```
And assign the function to a variable
```javascript
_.g = [][_.a.e][_.a.e],
```
Calling `_.g("console.log('obfuscate')")()` will result in code behaving like such: `(function(){console.log('obfuscate');})()`. This is similar to how `eval()` works.
We can also use this method to assign common functions that we cannot approach directly, like `escape()`. By using `_.j = (function() { return escape; })()` we can assign `escape()` to a variable, and then call it like `_.j(' ')`.

## More characters!
Because we now have 'constructor', we can also get the following strings:
```javascript
[]+/[]/['constructor']
> "function RegExp() { [native code] }"

[]+[]['constructor']
> "function Array() { [native code] }"

[]+([]+[])['constructor']
> "function String() { [native code] }"

_.b['constructor']
> "function Number() { [native code] }"
```

So let's assign these too:
```javascript
_.a.f = []+/[]/[_.a.e],    // "function RegExp() { [native code] }"
_.a.g = []+[][_.a.e],      // "function Array() { [native code] }"
_.a.h = []+([]+[])[_.a.e], // "function String() { [native code] }"
_.a.i = []+_.b[_.a.e],     // "function Number() { [native code] }"
```

Gained characters:
( ) { } A E g m N p R S v x y

Total available characters:
(space) ( ) { } [ ] A E N O R S a b c d e f g i j l m n o p r s t u v x y

## Even more characters!
We have a nice amount of letters available to us, but we are still missing a few. We use `toString` for this, so we can use the function `(number)['toString'](radix)`. See bottom for full toString table
```javascript
_.a.j = _.a.a[_.b]       // t
    + _.a.c[_.c]         // o
    + _.a.h[_.c+_.f+_.f] // S
    + _.a.a[_.b]         // t
    + _.a.a[_.c]         // r
    + _.a.d[_.c+_.f]     // i
    + _.a.d[_.c]         // n
    + _.a.h[[]+_.c+_.f]; // g
```

Now let's use `'true'['link']()`, which returns `<a href="undefined">true</a>`, to grab < > = " and /
```javascript
_.a.k = _.a.a[_.a.b[_.d]+_.a.d[_.c+_.f]+_.a.d[_.c]+((_.d+_.e)*_.f)[_.a.j](_.e*(_.e+_.f))]()
```

The next 3 functions use 'return', so let's build that and assign it:
```javascript
_.a.l = _.a.a[_.c] // r
	+_.a.a[_.e]    // e
	+_.a.a[_.b]    // t
	+_.a.a[_.d]    // u
	+_.a.a[_.c]    // r
	+_.a.d[_.c];   // n
```

To grab . (dot) and - (dash), we can do -1/2. The following is basically `(function(){return -1/2})()`
```javascript
_.a.m = []+_.g(_.a.l+_.a.c[_.e+_.f]+([]+~_.b)[_.b]+_.c+_.a.k[[]+_.d+(_.d+_.e)]+_.d)();
```

#### toString, escape and unescape
To call every other character that isn't covered earlier, we can use 3 functions: `toString` (on a Number), `escape`, and `unescape`
Because these functions are quite long and not every character is always required, the generator will check if these functions need to be included

Next up we will assign the `escape()` function. Using `escape(' ')` we can grab '%', which we will need so we can use `unescape()`
```javascript
_.h = _.g(_.a.l+_.a.c[_.e+_.f]+_.a.a[_.e]+_.a.b[_.e]+_.a.c[_.f+_.c]+_.a.b[_.c]+_.a.f[[]+_.c+_.f]+_.a.a[_.e])();
```

With `unescape('%xx')` we can create every character that we were missing, so we assign that too
```javascript
_.i = _.g(_.a.l+_.a.c[_.e+_.f]+_.a.a[_.d]+_.a.d[_.c]+_.a.a[_.e]+_.a.b[_.e]+_.a.c[_.f+_.c]+_.a.b[_.c]+_.a.f[[]+_.c+_.f]+_.a.a[_.e])();
```

And with all these functions assigned, we can create any string:
## Complete lookup table
```
'space' : _.a.c[_.e+_.f],
'(' : _.a.h[_.e*(_.d+_.e)],
')' : _.a.h[_.f*_.f],
'{' : _.a.h[_.e*(_.e+_.e)],
'}' : _.a.h[[]+_.e+_.f],
'[' : _.a.h[[]+_.d+_.b],
']' : _.a.h[[]+_.e+_.d],
'<' : _.a.k[_.b],
'>' : _.a.k[[]+_.c+(_.e*_.e)],
'=' : _.a.k[_.e+_.f],
'"' : _.a.k[_.f+_.f],
'/' : _.a.k[[]+_.d+(_.d+_.e)],
'-' : _.a.m[_.b],
'.' : _.a.m[_.d],
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
'A' : _.a.g[_.e*_.e],
'E' : _.a.f[_.e*_.f],
'N' : _.a.i[_.e*_.e],
'O' : _.a.c[_.d*_.f],
'R' : _.a.f[_.e*_.e],
'S' : _.a.h[_.e*_.e],
'a' : _.a.b[_.c],
'b' : _.a.c[_.d],
'c' : _.a.c[_.f+_.c],
'd' : _.a.d[_.d],
'e' : _.a.a[_.e],
'f' : _.a.b[_.b],
'g' : _.a.h[[]+_.c+_.f],
'h' : _.i(_.a.n+(_.e+_.e)+(_.f+_.f)),
'i' : _.a.d[_.c+_.f],
'j' : _.a.c[_.e],
'k' : _.i(_.a.n+(_.e+_.e)+_.a.c[_.d]),
'l' : _.a.b[_.d],
'm' : _.a.i[[]+_.c+_.c],
'n' : _.a.d[_.c],
'o' : _.a.c[_.c],
'p' : _.a.f[[]+_.c+_.f],
'q' : _.i(_.a.n+(_.e+_.f)+_.c),
'r' : _.a.a[_.c],
's' : _.a.b[_.e],
't' : _.a.a[_.b],
'u' : _.a.a[_.d],
'v' : _.a.f[[]+_.d+(_.d+_.e)],
'w' : _.i(_.a.n+(_.e+_.f)+(_.f+_.e)),
'x' : _.a.f[_.e*_.f+_.c],
'y' : _.a.g[_.e*_.f+_.c],
'z' : _.i(_.a.n+(_.e+_.f)+_.a.b[_.c])
```

## Yes yes, that is all fun, but why do we need all this?
```javascript
[]['constructor']['constructor']('console.log("obfuscation is awesome")')()
```
Using variables this becomes
```javascript
_.g(_.a.c[_.f+_.c]+_.a.c[_.c]+_.a.d[_.c]+_.a.b[_.e]+_.a.c[_.c]+_.a.b[_.d]+_.a.a[_.e]+_.a.m[_.d]+_.a.b[_.d]+_.a.c[_.c]+_.a.h[[]+_.c+_.f]+_.a.h[_.e*(_.d+_.e)]+_.a.k[_.f+_.f]+_.a.c[_.c]+_.a.c[_.d]+_.a.b[_.b]+_.a.a[_.d]+_.a.b[_.e]+_.a.c[_.f+_.c]+_.a.b[_.c]+_.a.a[_.b]+_.a.d[_.c+_.f]+_.a.c[_.c]+_.a.d[_.c]+_.a.c[_.e+_.f]+_.a.d[_.c+_.f]+_.a.b[_.e]+_.a.c[_.e+_.f]+_.a.b[_.c]+(_.f*_.f*_.d)[_.a.j](_.f*_.f*_.d+_.c)+_.a.a[_.e]+_.a.b[_.e]+_.a.c[_.c]+_.a.i[[]+_.c+_.c]+_.a.a[_.e]+_.a.k[_.f+_.f]+_.a.h[_.f*_.f])()
```
Replacing all the variable names with non-alphanumeric variables such as $ and _, we can write complete and fully functioning non-alphanumeric code:
```javascript
_=+[];_={_:{_:!![]+[],_$:![]+[],$:[]+{},$$:[][_]+[]},_$:_,$_:++_,$$:-~_++,$:-~_,__:-~++_},_.___=_._.$[_.__+_.$_]+_._.$[_.$_]+_._.$$[_.$_]+_._._$[_.$]+_._._[_._$]+_._._[_.$_]+_._.$$[_._$]+_._.$[_.__+_.$_]+_._._[_._$]+_._.$[_.$_]+_._._[_.$_],_.$$$=[][_.___][_.___],_._.___=[]+/[]/[_.___],_._.$__=[]+[][_.___],_._.$_=[]+([]+[])[_.___],_._.$$_=[]+_._$[_.___],_.$__=_._._[_._$]+_._.$[_.$_]+_._.$_[_.$_+_.__+_.__]+_._._[_._$]+_._._[_.$_]+_._.$$[_.$_+_.__]+_._.$$[_.$_]+_._.$_[[]+_.$_+_.__],_.$$_=_._._[_._._$[_.$$]+_._.$$[_.$_+_.__]+_._.$$[_.$_]+((_.$$+_.$)*_.__)[_.$__](_.$*(_.$+_.__))]();_._.$_$=([]+_.$$$(_._._[_.$_]+_._._[_.$]+_._._[_._$]+_._._[_.$$]+_._._[_.$_]+_._.$$[_.$_]+_._.$[_.$+_.__]+([]+~_._$)[_._$]+_.$_+_.$$_[[]+_.$$+(_.$$+_.$)]+_.$$)())[_.$$];_.$$$(_._.$[_.__+_.$_]+_._.$[_.$_]+_._.$$[_.$_]+_._._$[_.$]+_._.$[_.$_]+_._._$[_.$$]+_._._[_.$]+_._.$_$+_._._$[_.$$]+_._.$[_.$_]+_._.$_[[]+_.$_+_.__]+_._.$_[_.$*(_.$$+_.$)]+_.$$_[_.__+_.__]+_._.$[_.$_]+_._.$[_.$$]+_._._$[_._$]+_._._[_.$$]+_._._$[_.$]+_._.$[_.__+_.$_]+_._._$[_.$_]+_._._[_._$]+_._.$$[_.$_+_.__]+_._.$[_.$_]+_._.$$[_.$_]+_._.$[_.$+_.__]+_._.$$[_.$_+_.__]+_._._$[_.$]+_._.$[_.$+_.__]+_._._$[_.$_]+(_.__*_.__*_.$$)[_.$__](_.__*_.__*_.$$+_.$_)+_._._[_.$]+_._._$[_.$]+_._.$[_.$_]+_._.$$_[[]+_.$_+_.$_]+_._._[_.$]+_.$$_[_.__+_.__]+_._.$_[_.__*_.__])()
```
This will execute `console.log("obfuscation is awesome")`

## TODO:
* Use escape('"') to get '%' and then use unescape for every missing character
* Remove switch for local lookup table, instead calculate which mode would be shorter
* Improve encode.js for better code generation
* Write tests
* Minify obfuscator code automatically instead of manually
* Turn into nodejs module

'use strict';

const baseCodeStart = '_=+[];_={_:{_:!![]+[],_$:![]+[],$:[]+{},$$:[][_]+[]},_$:_,$_:++_,$$:-~_++,$:-~_,__:-~++_},_.___=_._.$[_.__+_.$_]+_._.$[_.$_]+_._.$$[_.$_]+_._._$[_.$]+_._._[_._$]+_._._[_.$_]+_._.$$[_._$]+_._.$[_.__+_.$_]+_._._[_._$]+_._.$[_.$_]+_._._[_.$_],_.$$$=[][_.___][_.___],_._.___=[]+/[]/[_.___],_._.$__=[]+[][_.___],_._.$_=[]+([]+[])[_.___],_._.$$_=[]+_._$[_.___],_.$__=_._._[_._$]+_._.$[_.$_]+_._.$_[_.$_+_.__+_.__]+_._._[_._$]+_._._[_.$_]+_._.$$[_.$_+_.__]+_._.$$[_.$_]+_._.$_[[]+_.$_+_.__],_.$$_=_._._[_._._$[_.$$]+_._.$$[_.$_+_.__]+_._.$$[_.$_]+((_.$$+_.$)*_.__)[_.$__](_.$*(_.$+_.__))]();';
const functionStart = '_.$$$(';
const functionEnd = ')()';

const lookupTable = {
	' ' : '_._.$[_.$+_.__]',
	'(' : '_._.$_[_.$*(_.$$+_.$)]',
	')' : '_._.$_[_.__*_.__]',
	'{' : '_._.$_[_.$*(_.$+_.$)]',
	'}' : '_._.$_[[]+_.$+_.__]',
	'[' : '_._.$_[[]+_.$$+_._$]',
	']' : '_._.$_[[]+_.$+_.$$]',
	'<' : '_.$$_[_._$]',
	'>' : '_.$$_[[]+_.$_+(_.$*_.$)]',
	'=' : '_.$$_[_.$+_.__]',
	'"' : '_.$$_[_.__+_.__]',
	'/' : '_.$$_[[]+_.$$+(_.$$+_.$)]',
	'A' : '_._.$__[_.$*_.$]',
	'E' : '_._.___[_.$*_.__]',
	'N' : '_._.$$_[_.$*_.$]',
	'O' : '_._.$[_.$$*_.__]',
	'R' : '_._.___[_.$*_.$]',
	'S' : '_._.$_[_.$*_.$]',
	'a' : '_._._$[_.$_]',
	'b' : '_._.$[_.$$]',
	'c' : '_._.$[_.__+_.$_]',
	'd' : '_._.$$[_.$$]',
	'e' : '_._._[_.$]',
	'f' : '_._._$[_._$]',
	'g' : '_._.$_[[]+_.$_+_.__]',
	'h' : '(_.__*_.__+_.$_)[_.$__](_.$*_.$*_.$$)',
	'i' : '_._.$$[_.$_+_.__]',
	'j' : '_._.$[_.$]',
	'k' : '((_.$$+_.$)*_.__)[_.$__](_.$*(_.$+_.__))',
	'l' : '_._._$[_.$$]',
	'm' : '_._.$$_[[]+_.$_+_.$_]',
	'n' : '_._.$$[_.$_]',
	'o' : '_._.$[_.$_]',
	'p' : '_._.___[[]+_.$_+_.__]',
	'q' : '((_.$$+_.$)*(_.$$+_.$)+_.$_)[_.$__](_.$*_.$*_.$)',
	'r' : '_._._[_.$_]',
	's' : '_._._$[_.$]',
	't' : '_._._[_._$]',
	'u' : '_._._[_.$$]',
	'v' : '_._.___[[]+_.$$+(_.$$+_.$)]',
	'w' : '(_.__*_.__*_.$$)[_.$__](_.__*_.__*_.$$+_.$_)',
	'x' : '_._.___[_.$*_.__+_.$_]',
	'y' : '_._.$__[_.$*_.__+_.$_]',
	'z' : '((_.__+_.$)*(_.__+_.$_))[_.$__](_.$*_.$*_.__)',
	'0' : '_._$',
	'1' : '_.$_',
	'2' : '_.$$',
	'3' : '_.$',
	'4' : '_.__',
	'5' : '_.$_+_.__',
	'6' : '_.$+_.$',
	'7' : '_.$+_.__',
	'8' : '_.__+_.__',
	'9' : '_.$*_.$'
}

const sortOccurences = code => {
    let frequency = {},
		value,
		array = code.split('');

    for (var i = 0; i < array.length; i++) {
        value = array[i];
        if (value in frequency) {
            frequency[value]++;
        } else {
            frequency[value] = 1;
        }
    }

    let uniques = [];
    for (value in frequency) uniques.push(value);

    return uniques.sort((a, b) => frequency[b] - frequency[a]);
}

const generateLookupTable = code => {
	const occ = sortOccurences(code),
		codesplit = code.replace(/\s/g, ' ').split(''),
		base = '$',
		vars = ['_','$','__','$_','$$','_$','___','$__','$$_','$$$','_$$','__$','$_$','_$_','____','$___','$$__','$$$_','$$$$','_$$$','__$$','___$','_$__','_$$_','__$_','$$_$','$_$$','$_$_','_$_$','$__$','_____','$____','$_$_$','_$_$_','__$__','_$___','__$$_','_$_$$','$__$$','$$_$_','$$__$','$$_$$','$___$','$__$_'];

	let table = {};
	occ.forEach((c, i) => {
		table[c] = {key: vars[i], value: lookupTable[c]};
	});

	const localTable = {},
		substCode = [];

	codesplit.forEach(c => {
		const t = table[c];
		substCode.push(base + '.' + t.key);
		localTable[t.key] = t.value;
	});

	const localLookupTable = base + '=' + JSON.stringify(localTable).replace(/"/g, '') + ';';

	return {
		table: localLookupTable,
		code: substCode.join('+')
	}
}

const encode = code => code.replace(/\s/g, ' ').split('').map(c => lookupTable[c]).join('+');

const obfuscate = code => [baseCodeStart, functionStart, encode(code), functionEnd].join('');

const obfuscateLT = code => {
	const LT = generateLookupTable(code);
	return [baseCodeStart, LT.table, functionStart, LT.code, functionEnd].join('');
}

console.log(Object.keys(lookupTable));
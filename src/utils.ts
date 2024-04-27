import * as fs from "fs";

const specialCharacters: { [key: string]: string } = {
	"<A/>": "Ā",
	"<a/>": "ā",
	"<a,>": "a",
	"<A,>": "A",
	"<Â>": "Â",
	"<â>": "â",
	"<n,>": "n",
	"<N,>": "N",
	"<N^>": "Ň",
	"<n^>": "ň",
	"<C´>": "Ć",
	"<c´>": "ć",
	"<C^>": "Č",
	"<CH>": "Č",
	"<c^>": "č",
	"<ch>": "č",
	"<d´>": "đ",
	"<Ğ>": "Ğ",
	"<DJ>": "Ğ",
	"<ğ>": "ğ",
	"<dj>": "ğ",
	"<E/>": "Ē",
	"<e/>": "ē",
	"<E°>": "Ė",
	"<e°>": "ė",
	"<E,>": "Ę",
	"<e,>": "ę",
	"<Ê>": "Ê",
	"<ê>": "ê",
	"<G^>": "Ĝ",
	"<g^>": "ĝ",
	"<g´>": "ģ",
	"<I/>": "Ī",
	"<i/>": "ī",
	"<i>": "ı",
	"<K,>": "Ķ",
	"<k,>": "ķ",
	"<L,>": "Ļ",
	"<l,>": "ļ",
	"<L´>": "Ľ",
	"<l´>": "ľ",
	"<L/>": "Ł",
	"<l/>": "ł",
	"<Ö>": "Ö",
	"<ö>": "ö",
	"<R^>": "Ř",
	"<r^>": "ř",
	"<S,>": "Ş",
	"<s,>": "ş",
	"<T,>": "T",
	"<t,>": "t",
	"<t´>": "t",
	"<U/>": "Ū",
	"<u/>": "ū",
	"<U°>": "U",
	"<u°>": "u",
	"<U,>": "U",
	"<u,>": "u",
	"<Z°>": "Ż",
	"<z°>": "ż",
	"<Z^>": "Ž",
	"<z^>": "ž",
	"<ß>": "ß",
	"<I°>": "İ",
	"<S^>": "Š",
	"<SCH>": "Š",
	"<SH>": "Š",
	"<s^>": "š",
	"<sch>": "š",
	"<sh>": "š",
};

const escapeRegExp = (string: string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const replaceSpecial = (data: string): string => {
	let replacedData = data;

	for (const key in specialCharacters) {
		const regex = new RegExp(escapeRegExp(key), "g");
		replacedData = replacedData.replace(regex, specialCharacters[key]);
	}

	return replacedData;
};

export const openFile = async (path: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, "latin1", (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

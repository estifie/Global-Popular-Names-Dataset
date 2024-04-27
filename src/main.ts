import { createObjectCsvWriter } from "csv-writer";
import * as fs from "fs";
import winston from "winston";
import yargs from "yargs/yargs";
import { DEFAULT_OUTPUT_FILE, DEFAULT_START_LINE } from "./consts";
import { ArgvOptions, Name, Origin } from "./types";
import { openFile, replaceSpecial } from "./utils";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [new winston.transports.Console()],
});

let nameData: { count: number; data: { [key: string]: Name } } = {
	count: 0,
	data: {},
};

const processData = async () => {
	const argv = yargs(process.argv.slice(2))
		.options({
			"start-line": {
				alias: "s",
				description: "The line to start reading the file from",
				type: "number",
				default: DEFAULT_START_LINE,
			},
			input: {
				alias: "input",
				description: "The file to read the data from",
				type: "string",
				demandOption: true,
			},
			output: {
				alias: "o",
				description: "The file to write the data to",
				type: "string",
				default: DEFAULT_OUTPUT_FILE,
			},
			minify: {
				alias: "m",
				description: "Whether to minify the output",
				type: "boolean",
				default: false,
			},
		})
		.parse() as ArgvOptions;

	const outputFile = argv.output;
	const startLine = argv["start-line"];
	const dataFile = argv.input;
	const minify = argv.minify;

	try {
		let data = await openFile(dataFile);

		// Replace special characters
		data = replaceSpecial(data).split("\n").slice(startLine).join("\n");

		const lines = data.split("\n");
		for (const line of lines) {
			const gender = line.slice(0, 3).trim();
			let name = line.slice(3).split(" ")[0].replace(/\+/g, " ").trim();

			// Parse the origin of the name
			const originString = line.slice(-58, -2);
			let origin: Origin = parseOrigin(originString, minify);

			if (gender === "" || name === "") {
				continue;
			}

			if (nameData.data[name]) {
				continue;
			}

			nameData.data[name] = {
				gender: gender,
				origin: origin,
			};
		}

		// If outputFile's extension is .csv, write the data to a csv file
		if (outputFile.endsWith(".csv")) {
			const nameArray = Object.keys(nameData.data).map((name) => ({
				name: name,
				gender: nameData.data[name].gender,
				origin: JSON.stringify(nameData.data[name].origin),
			}));

			const csvData = createObjectCsvWriter({
				path: `${outputFile}`,
				header: [
					{ id: "name", title: "Name" },
					{ id: "gender", title: "Gender" },
					{ id: "origin", title: "Origin" },
				],
			});

			await csvData.writeRecords(nameArray);
			logger.info(`Data written to ${outputFile}`);
		} else {
			nameData.count = Object.keys(nameData.data).length;

			fs.writeFile(`${outputFile}`, JSON.stringify(nameData), (err) => {
				if (err) {
					console.error(err);
					return;
				}
				logger.info(`Data written to ${outputFile}`);
			});
		}
	} catch (err) {
		logger.error(err);
		return;
	}
};

/**
 *
 * @description Parses the possible origins of a name
 * @param originString
 * @param minify
 * @returns Origin
 *
 */
const parseOrigin = (originString: string, minify: boolean): Origin => {
	let origin: Origin = minify
		? {
				GB: originString[0], // Great Britain
				IE: originString[1], // Ireland
				US: originString[2], // United States
				IT: originString[3], // Italy
				MT: originString[4], // Malta
				PT: originString[5], // Portugal
				ES: originString[6], // Spain
				FR: originString[7], // France
				BE: originString[8], // Belgium
				LU: originString[9], // Luxembourg
				NL: originString[10], // Netherlands
				"East Frisia": originString[11], // East Frisia
				DE: originString[12], // Germany
				AT: originString[13], // Austria
				CH: originString[14], // Switzerland
				IS: originString[15], // Iceland
				DK: originString[16], // Denmark
				NO: originString[17], // Norway
				SE: originString[18], // Sweden
				FI: originString[19], // Finland
				EE: originString[20], // Estonia
				LV: originString[21], // Latvia
				LT: originString[22], // Lithuania
				PL: originString[23], // Poland
				CZ: originString[24], // Czechia
				SK: originString[25], // Slovakia
				HU: originString[26], // Hungary
				RO: originString[27], // Romania
				BG: originString[28], // Bulgaria
				BA: originString[29], // Bosnia and Herzegovina
				HR: originString[30], // Croatia
				Kosovo: originString[31], // Kosovo
				MK: originString[32], // North Macedonia
				ME: originString[33], // Montenegro
				RS: originString[34], // Serbia
				SI: originString[35], // Slovenia
				AL: originString[36], // Albania
				GR: originString[37], // Greece
				RU: originString[38], // Russia
				BY: originString[39], // Belarus
				MD: originString[40], // Moldova
				UA: originString[41], // Ukraine
				AM: originString[42], // Armenia
				AZ: originString[43], // Azerbaijan
				GE: originString[44], // Georgia
				"KZ/UZ/.etc": originString[45], // Kazakhstan, Uzbekistan, etc.
				TR: originString[46], // Turkey
				"SA/IR": originString[47], // Saudi Arabia, Iran
				IL: originString[48], // Israel
				CN: originString[49], // China
				"IN/LK": originString[50], // India, Sri Lanka
				JP: originString[51], // Japan
				KR: originString[52], // South Korea
				VN: originString[53], // Vietnam
				OTHER: originString[54], // Other
		  }
		: {
				"Great Britain": originString[0], // Great Britain
				Ireland: originString[1], // Ireland
				"United States": originString[2], // United States
				Italy: originString[3], // Italy
				Malta: originString[4], // Malta
				Portugal: originString[5], // Portugal
				Spain: originString[6], // Spain
				France: originString[7], // France
				Belgium: originString[8], // Belgium
				Luxembourg: originString[9], // Luxembourg
				Netherlands: originString[10], // Netherlands
				"East Frisia": originString[11], // East Frisia
				Germany: originString[12], // Germany
				Austria: originString[13], // Austria
				Switzerland: originString[14], // Switzerland
				Iceland: originString[15], // Iceland
				Denmark: originString[16], // Denmark
				Norway: originString[17], // Norway
				Sweden: originString[18], // Sweden
				Finland: originString[19], // Finland
				Estonia: originString[20], // Estonia
				Latvia: originString[21], // Latvia
				Lithuania: originString[22], // Lithuania
				Poland: originString[23], // Poland
				Czechia: originString[24], // Czechia
				Slovakia: originString[25], // Slovakia
				Hungary: originString[26], // Hungary
				Romania: originString[27], // Romania
				Bulgaria: originString[28], // Bulgaria
				"Bosnia and Herzegovina": originString[29], // Bosnia and Herzegovina
				Croatia: originString[30], // Croatia
				Kosovo: originString[31], // Kosovo
				"North Macedonia": originString[32], // North Macedonia
				Montenegro: originString[33], // Montenegro
				Serbia: originString[34], // Serbia
				Slovenia: originString[35], // Slovenia
				Albania: originString[36], // Albania
				Greece: originString[37], // Greece
				Russia: originString[38], // Russia
				Belarus: originString[39], // Belarus
				Moldova: originString[40], // Moldova
				Ukraine: originString[41], // Ukraine
				Armenia: originString[42], // Armenia
				Azerbaijan: originString[43], // Azerbaijan
				Georgia: originString[44], // Georgia
				"Kazakhstan, Uzbekistan, etc.": originString[45], // Kazakhstan, Uzbekistan, etc.
				Turkey: originString[46], // Turkey
				"Arabia/Persia": originString[47], // Saudi Arabia, Iran
				Israel: originString[48], // Israel
				China: originString[49], // China
				"India, Sri Lanka": originString[50], // India, Sri Lanka
				Japan: originString[51], // Japan
				"South Korea": originString[52], // South Korea
				Vietnam: originString[53], // Vietnam
				Others: originString[54], // Other
		  };

	for (const key in origin) {
		if (origin[key] === " ") {
			delete origin[key];
		}
	}

	return origin;
};

processData();

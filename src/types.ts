export type Origin = {
	[key: string]: string;
};

export type Name = {
	gender: string;
	origin: Origin;
};

export type ArgvOptions = {
	"start-line": number;
	input: string;
	output: string;
	minify: boolean;
};

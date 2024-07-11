import sharp from "sharp";

const chars = {
	"char-x": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 4l10 16m0-16L7 20"/>`,
	"char-0": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 16V8m-4 12a4 4 0 0 0 4-4V8a4 4 0 1 0-8 0v8a4 4 0 0 0 4 4"/>`,
	"char-1": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 20V4L8 9"/>`,
	"char-2": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8a4 4 0 1 1 8 0c0 1.098-.564 2.025-1.159 2.815L8 20h8"/>`,
	"char-3": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12a4 4 0 1 0-4-4m0 8a4 4 0 1 0 4-4"/>`,
	"char-4": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 20V5L7 16h10"/>`,
	"char-5": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20h4a4 4 0 1 0 0-8H8V4h8"/>`,
	"char-6": `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 16a4 4 0 1 0 8 0v-1a4 4 0 1 0-8 0"/><path d="M16 8a4 4 0 1 0-8 0v8"/></g>`,
	"char-7": `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4h8l-4 16"/>`,
	"char-8": `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 8a4 4 0 1 0 8 0a4 4 0 1 0-8 0"/><path d="M8 16a4 4 0 1 0 8 0a4 4 0 1 0-8 0"/></g>`,
	"char-9": `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 8a4 4 0 1 0-8 0v1a4 4 0 1 0 8 0"/><path d="M8 16a4 4 0 1 0 8 0V8"/></g>`
};

export default eventHandler(async (event) => {
	const size = event.context.params.size || "500x500";

	let width: number, height: number;

	if (size.includes("x")) {
		width = Number(size.split("x")[0]);
		height = Number(size.split("x")[1]);
	} else {
		width = height = Number(size);
	}

	const printChars = () => {
		const res = [];

		size.split("").forEach((char, charIndex) => {
			res.push(`<g transform="translate(${charIndex * 20}, 0)">${chars[`char-${char}`]}</g>`);
		});

		return res;
	};

	const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#ccc" />
			<g transform="translate(${(width / 2) - (size.length * 10)} ${(height / 2) - 20})">
				${printChars().map((char) => char)}
			</g>
        </svg>
    `;

	// eslint-disable-next-line node/prefer-global/buffer
	return sharp(Buffer.from(svg)).webp();
});

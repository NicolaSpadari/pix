import sharp from "sharp";
import { icons } from "@iconify-json/tabler";

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
			if (!Number.isNaN(Number(char))) {
				res.push(`<g transform="translate(${charIndex * 20}, 0)">${icons.icons[`number-${char}`].body}</g>`);
			} else {
				res.push(`<g transform="translate(${charIndex * 20}, 0)">${icons.icons[`letter-${char}`].body}</g>`);
			}
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

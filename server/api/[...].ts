import sharp from "sharp";

const getTitle = (width: number, height: number, text?: string) => {
	if (text && text !== "")
		return text;
	return `${width} x ${height}`;
};

export default defineEventHandler(async (event) => {
	const size = event.context.params?._ || "500";
	const { text } = getQuery(event);

	let width, height;

	if (size.includes("x")) {
		width = Number(size.split("x")[0]);
		height = Number(size.split("x")[1]);
	} else {
		width = height = Number(size);
	}

	const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<style>
					@import url('https://fonts.googleapis.com/css2?family=Inter');
					.inter{
						font-family: Inter;
					}
				</style>
			</defs>
            <rect width="100%" height="100%" fill="#ccc" />
            <text x="50%" y="53%" font-size="35" class="inter" dominant-baseline="middle" text-anchor="middle" fill="#9c9c9c">
                ${getTitle(width, height, text?.toString())}
            </text>
        </svg>
    `;

	return sharp(Buffer.from(svg)).webp();
});

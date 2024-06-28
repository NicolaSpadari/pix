import sharp from "sharp";

const getTitle = (w: number, h: number, t?: string) => {
	if (t) return t;
	return `${w}x${h}`
}

export default defineEventHandler(async (event) => {
	const size = event.context.params?._ || "500";
	const { text } = getQuery(event);

	let width, height;

	if(size.includes("x")){
		width = Number(size.split("x")[0]);
		height = Number(size.split("x")[1]);
	}else{
		width = height = Number(size);
	}

	const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#fff" />
            <text x="50%" y="50%" font-size="20" font-family="Arial, sans-serif" 
                dominant-baseline="middle" text-anchor="middle" fill="${text}">
                ${getTitle(width, height, text?.toString())}
            </text>
        </svg>
    `;

    return sharp(Buffer.from(svg)).png();
})
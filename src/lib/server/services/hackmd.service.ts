import { HACKMD_API_KEY } from '$env/static/private';

export async function fetchHackMDAsMarkdown(link: string) {
	const response = await fetch(`https://api.hackmd.io/v1/notes/${getHackMDIdFromLink(link)}`, {
		headers: {
			Authorization: `Bearer ${HACKMD_API_KEY}`
		}
	});
	return response.text();
}

function getHackMDIdFromLink(link: string) {
	const url = new URL(link);
	return url.pathname.split('/').pop();
}

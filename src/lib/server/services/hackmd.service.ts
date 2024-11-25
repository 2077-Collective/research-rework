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

export async function createdTeamNote(title: string, content: string) {
	const response = await fetch(`https://api.hackmd.io/v1/teams/2077Research/notes`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${HACKMD_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title,
			content
		})
	});

	return response.json() as Promise<{ id: string; publishLink: string }>;
}

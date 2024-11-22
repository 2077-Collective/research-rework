import { google } from 'googleapis';
import { GOOGLE_SERVICE_ACCOUNT_BASE_64 } from '$env/static/private';
const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

// Function to authenticate and fetch a Google Doc as markdown
export async function fetchGoogleDocAsMarkdown(documentLink: string) {
	const decodedServiceAccount = Buffer.from(GOOGLE_SERVICE_ACCOUNT_BASE_64, 'base64').toString(
		'utf-8'
	);
	const credentials = JSON.parse(decodedServiceAccount);

	try {
		const auth = new google.auth.GoogleAuth({
			credentials: {
				...credentials,
				private_key: credentials.private_key.replace(/\\n/g, '\n')
			},
			scopes: SCOPES
		});
		const docs = google.docs({ version: 'v1', auth });
		const response = await docs.documents.get({
			documentId: extractDocumentIdFromLink(documentLink)
		});
		const document = response.data;

		return parseGoogleDocToMarkdown(document);
	} catch (error) {
		console.error('Error fetching document:', error);
	}
}

function parseGoogleDocToMarkdown(doc: any): string {
	const { title, body } = doc;

	const parseTextRun = (textRun: any): string => {
		if (!textRun) return '';

		const { content, textStyle } = textRun;
		if (!textStyle) return content;

		let result = content;

		if (textStyle.bold) result = `**${result.trim()}**`;
		if (textStyle.italic) result = `*${result.trim()}*`;
		if (textStyle.underline) result = `[${result.trim()}](${textStyle.link?.url || ''})`;

		return result;
	};

	const parseParagraph = (paragraph: any): string => {
		const elements = paragraph.elements || [];
		const text = elements.map((el: any) => parseTextRun(el.textRun)).join('\n');

		const style = paragraph.paragraphStyle?.namedStyleType;
		if (style === 'TITLE') {
			return `# ${text}`;
		} else if (style === 'HEADING_1') {
			return `## ${text}`;
		} else if (style === 'HEADING_2') {
			return `### ${text}`;
		} else if (style === 'HEADING_3') {
			return `#### ${text}`;
		}

		return text.trim();
	};

	const contentToMarkdown = (content: any[]): string => {
		return content
			.map((item) => {
				if (item.paragraph) {
					return parseParagraph(item.paragraph);
				}
				return '';
			})
			.filter((line) => line.trim().length > 0)
			.join('\n\n');
	};

	const markdown = `# ${title}\n\n${contentToMarkdown(body.content)}`;
	return markdown;
}

function extractDocumentIdFromLink(link: string) {
	return link.split('/d/')[1].split('/edit')[0];
}

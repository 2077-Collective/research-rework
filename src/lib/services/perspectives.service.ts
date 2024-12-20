import { PUBLIC_BASE_API_URL } from '$env/static/public';
import {
	PerspectivesArticleMetadataArraySchema,
	PerspectivesArticleSchema,
	type PerspectivesArticle,
	type PerspectivesArticleMetadata
} from '$lib/types/perspectives';

const mockPerspectivesArticles = [
	{
		author: {
			username: 'vitalik_buterin',
			id: '1',
			full_name: 'Vitalik Buterin',
			twitter_username: 'vitalik',
			avatar: '/vitalik.png',
			company: {
				name: 'Ethereum Foundation',
				logo: 'https://example.com/logo.png'
			},
			role: 'Founder',
			bio: 'Co-founder of Ethereum, is a visionary in blockchain. His innovations, including smart contracts, revolutionized decentralized applications. Buterins work has significantly impacted the global financial landscape.'
		},
		read_time: 5,
		created_at: '2023-01-01T00:00:00Z',
		updated_at: '2023-01-02T00:00:00Z',
		title: 'What I would love to see in a wallet',
		subtitle: 'A sample article subtitle',
		description:
			'Vitalik shares his perspective on the future of wallets by further enhancing security, privacy, and user experience for seamless cross-chain transactions.',
		slug: 'what-i-would-love-to-see-in-a-wallet',
		categories: ['Category 1', 'Category 2']
	},
	{
		author: {
			username: 'karl_floersch',
			id: '2',
			full_name: 'Karl Floersch',
			twitter_username: 'karl',
			avatar: '/karl.png',
			role: 'Founder',
			bio: 'Building great products',
			company: {
				name: 'Optimism',
				logo: 'https://example.com/logo.png'
			}
		},
		created_at: '2023-02-01T00:00:00Z',
		updated_at: '2023-02-01T00:00:00Z',
		read_time: 3,
		title: 'Example Article 2',
		subtitle: 'A sample article subtitle',
		description: 'This is a sample article description',
		slug: 'example-article-2',
		categories: ['Category 1', 'Category 3']
	},
	{
		author: {
			username: 'justin_drake',
			id: '3',
			full_name: 'Justin Drake',
			twitter_username: 'justin',
			avatar: '/justin.png',
			company: {
				name: 'Ethereum Foundation',
				logo: '/ef.png'
			},
			role: 'Researcher',
			bio: 'Designing scalable systems for the future'
		},
		created_at: '2023-03-15T00:00:00Z',
		updated_at: '2023-03-16T00:00:00Z',
		read_time: 7,
		title: 'Example Article 3',
		subtitle: 'A sample article subtitle',
		description: 'This is a sample article description',
		slug: 'example-article-3',
		categories: ['Category 1', 'Category 4']
	},
	{
		author: {
			username: 'sarah_johnson',
			id: '4',
			full_name: 'Sarah Johnson',
			twitter_username: 'sarah_johnson',
			avatar: 'https://example.com/avatar4.jpg',
			role: 'UX Researcher',
			bio: 'Creating user-centered experiences through research and design',
			company: {
				name: 'Design Studio',
				logo: 'https://example.com/designstudio.png'
			}
		},
		created_at: '2023-04-01T00:00:00Z',
		updated_at: '2023-04-02T00:00:00Z',
		read_time: 4,
		title: 'Example Article 4',
		subtitle: 'A sample article subtitle',
		description: 'This is a sample article description',
		slug: 'example-article-4',
		categories: ['Category 1', 'Category 5']
	},
	{
		author: {
			username: 'david_kim',
			id: '5',
			full_name: 'David Kim',
			avatar: 'https://example.com/avatar5.jpg',
			twitter_username: 'david_kim',
			company: {
				name: 'Innovation Labs',
				logo: 'https://example.com/innovationlabs.png'
			},
			role: 'AI Research Lead',
			bio: 'Exploring the frontiers of artificial intelligence'
		},
		created_at: '2023-05-01T00:00:00Z',
		updated_at: '2023-05-03T00:00:00Z',
		read_time: 6,
		title: 'Example Article 5',
		subtitle: 'A sample article subtitle',
		description: 'This is a sample article description',
		slug: 'example-article-5',
		categories: ['Category 1', 'Category 6']
	}
];

export const fetchPerspectivesMetadataMock = async (): Promise<PerspectivesArticleMetadata[]> => {
	return PerspectivesArticleMetadataArraySchema.parse(mockPerspectivesArticles);
};

export const fetchPerspectivesMetadata = async (): Promise<PerspectivesArticleMetadata[]> => {
	try {
		const res = await fetch(`${PUBLIC_BASE_API_URL}/perspectives`);
		const body = await res.json();
		return PerspectivesArticleMetadataArraySchema.parse(body);
	} catch (error) {
		return [];
	}
};

export const getPerspectivesArticleBySlug = async (
	slug: string
): Promise<PerspectivesArticle | null> => {
	try {
		const res = await fetch(`${PUBLIC_BASE_API_URL}/perspectives/${slug}`);
		const body = await res.json();
		return PerspectivesArticleSchema.parse(body);
	} catch (error) {
		return null;
	}
};

const mockPerspectiveArticle = {
	metadata: {
		author: {
			username: 'vitalik_buterin',
			id: '1',
			full_name: 'Vitalik Buterin',
			twitter_username: 'vitalik',
			avatar: '/vitalik.png',
			company: {
				name: 'Ethereum Foundation',
				logo: 'https://example.com/logo.png'
			},
			role: 'Founder',
			bio: 'Co-founder of Ethereum, is a visionary in blockchain. His innovations, including smart contracts, revolutionized decentralized applications. Buterins work has significantly impacted the global financial landscape.'
		},
		read_time: 5,
		created_at: '2023-01-01T00:00:00Z',
		updated_at: '2023-01-02T00:00:00Z',
		title: 'What I would love to see in a wallet',
		subtitle: 'A sample article subtitle',
		description:
			'Vitalik shares his perspective on the future of wallets by further enhancing security, privacy, and user experience for seamless cross-chain transactions.',
		slug: 'what-i-would-love-to-see-in-a-wallet',
		categories: ['Category 1', 'Category 2']
	},
	title: 'What I would love to see in a wallet',
	// TODO: remove this prop to avoid duplication
	description:
		'Vitalik shares his perspective on the future of wallets by further enhancing security, privacy, and user experience for seamless cross-chain transactions.',
	subtitle: 'A sample article subtitle',
	content: `
			<h1>What I would love to see in a wallet</h1>
			
			<p>As blockchain technology continues to evolve, the importance of well-designed cryptocurrency wallets cannot be overstated. Today, I want to share my vision for the next generation of crypto wallets.</p>
			
			<h2>Enhanced Security Features</h2>
			<p>Security should always be the top priority. Future wallets need to implement:</p>
			<ul>
				<li>Multi-factor authentication that goes beyond traditional methods</li>
				<li>Social recovery systems that are both robust and user-friendly</li>
				<li>Hardware security module integration for institutional users</li>
			</ul>
			
			<h2>Improved User Experience</h2>
			<p>The current generation of wallets often sacrifices usability for security. We need to find ways to maintain security while making the experience more intuitive. This includes:</p>
			<ul>
				<li>Better transaction previews</li>
				<li>Clear warning systems for suspicious activities</li>
				<li>Simplified backup procedures</li>
			</ul>
			
			<h2>Cross-chain Compatibility</h2>
			<p>As the ecosystem grows, users shouldn't need multiple wallets for different chains. A modern wallet should:</p>
			<ul>
				<li>Support multiple chains natively</li>
				<li>Provide unified transaction history</li>
				<li>Offer seamless bridge integration</li>
			</ul>
			
			<h2>Privacy Considerations</h2>
			<p>Privacy features need to be built-in from the ground up. This includes:</p>
			<ul>
				<li>Optional stealth addresses</li>
				<li>Integration with privacy-preserving protocols</li>
				<li>Transparent privacy settings</li>
			</ul>
			
			<h3>Conclusion</h3>
			<p>The future of crypto wallets lies in finding the perfect balance between security, usability, and privacy. By focusing on these key areas, we can create tools that not only protect users' assets but also make blockchain technology more accessible to everyone.</p>
	`
};

export const getPerspectivesArticleBySlugMock = async (
	slug: string
): Promise<PerspectivesArticle> => {
	return PerspectivesArticleSchema.parse(mockPerspectiveArticle);
};

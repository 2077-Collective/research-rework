type ImageType = 'card' | 'spotlight';

interface TransformOptions {
    width?: number;
    height?: number;
    type?: ImageType;
}

const TRANSFORM_PRESETS: Record<ImageType, string> = {
    card: 'w_464,h_464,c_fill,ar_1:1,g_auto,q_auto,f_auto',
    spotlight: 'w_640,h_475,c_fill,f_auto,q_auto'
};

export function optimizeCloudinaryUrl(url: string, options: TransformOptions = {}): string {
    if (!url || !url.includes('cloudinary.com')) return url;

    let baseUrl: string;
    let path: string;

    if (url.includes('/upload/')) {
        [baseUrl, path] = url.split('/upload/');
        baseUrl = `${baseUrl}/upload`;
    } else if (url.includes('/coverImage/')) {
        [baseUrl, path] = url.split('/coverImage/');
    } else {
        return url;
    }

    // Determine transform parameters
    let transformParams: string;
    if (options.type && options.type in TRANSFORM_PRESETS) {
        transformParams = TRANSFORM_PRESETS[options.type];
    } else if (options.width && options.height) {
        transformParams = `w_${options.width},h_${options.height},c_fill,q_auto,f_auto`;
    } else {
        transformParams = TRANSFORM_PRESETS.card; // Default to card preset
    }

    // Construct the final URL
    const pathPrefix = url.includes('/upload/') ? '' : 'coverImage/';
    return `${baseUrl}/${transformParams}/${pathPrefix}${path}`;
}

// Legacy function names for backward compatibility
export const optimizeSpotlightImage = (url: string) => 
    optimizeCloudinaryUrl(url, { type: 'spotlight' });
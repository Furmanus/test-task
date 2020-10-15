import {IGitHubUserDetails} from './interfaces';

export function isGitHubUserDetails(obj: object): obj is IGitHubUserDetails {
    return typeof obj === 'object' && obj !== null && 'public_repos' in obj && 'html_url' in obj;
}

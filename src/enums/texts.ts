export enum Languages {
    En = 'en',
}

type AppTextsType = {
    [K in Languages]: Record<string, string>;
};

const proxyTextHandler = {
    get(target: Record<string, string>, property: string): string {
        if (property in target) {
            return target[property];
        }

        return 'Translation not found';
    }
};
/**
 * Basically each value instead on plain object is proxy with get trap, which acts like object with default value for
 * unknown property
 */
export const AppTexts: AppTextsType = {
    [Languages.En]: new Proxy({
        UserListTableHeading: 'List of GitHub users',
        UserDetailsCardHeading: 'User details',
        UserDetailsType: 'Type: {{type}}',
        UserDetailsFollowers: 'Followers: {{followers}}',
        UserDetailsFollowing: 'Following: {{following}}',
        UserDetailsPublicRepos: 'Public repos: {{repos}}',
        UserDetailsProfile: 'user profile',
    }, proxyTextHandler),
};

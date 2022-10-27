export const trimAccount = (account) => `${account.slice(0, 10)}...`;

export const checkOnlySpaceOnString = (str: string): boolean => str.trim().length === 0;

// add other util / helper functions here...

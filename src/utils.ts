export const trimAccount = (account) => `${account.slice(0, 10)}...`;

export const checkOnlySpaceOnString = (str: string): boolean => str.trim().length === 0;

// add other util / helper functions here...

export const getImageFromArweave = async (imageHash: string): Promise<Blob> => {
  const imageBlob = await window.point.storage.getFile({ id: imageHash });

  return imageBlob;
};

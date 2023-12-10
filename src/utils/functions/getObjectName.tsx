/* eslint-disable no-plusplus */
export default function getObjectName<T>(obj: T): string | undefined {
  const idKeys: string[] = Object.keys(obj as object).filter((key) => key.startsWith('id') || key.startsWith('nm'));
  if (idKeys.length === 0) {
    return undefined;
  }
  const suffixCounts: Record<string, number> = {};
  for (let i = 0; i < idKeys.length; i++) {
    const key = idKeys[i];
    const suffix = key.slice(2);
    suffixCounts[suffix] = (suffixCounts[suffix] || 0) + 1;
  }

  let maxCount = 0;
  let objectName: string | undefined;
  const suffixes = Object.keys(suffixCounts);
  for (let i = 0; i < suffixes.length; i++) {
    const suffix = suffixes[i];
    if (suffixCounts[suffix] > maxCount) {
      maxCount = suffixCounts[suffix];
      objectName = suffix;
    }
  }

  return objectName;
}

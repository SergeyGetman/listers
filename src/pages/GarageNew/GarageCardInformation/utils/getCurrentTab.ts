import { CardInformationPathTabs } from '../../types';

export const getCurrentTab = (pathname: string): CardInformationPathTabs => {
  const splitPathname = pathname.split('/');

  return splitPathname[splitPathname.length - 1] as CardInformationPathTabs;
};

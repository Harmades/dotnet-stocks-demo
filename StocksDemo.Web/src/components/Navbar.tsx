
import React from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import { FontSizes, getTheme, ISeparatorStyles, Separator } from '@fluentui/react';

export interface NavbarProps {
  userContext: UserContext | null;
}

export const Navbar: React.FC<NavbarProps> = ({ userContext }: NavbarProps) => {
  const navStyles: Partial<INavStyles> = {
    root: {
      flex: 1,
    }
  };

  const separatorStyles: Partial<ISeparatorStyles> = {
    root: {
      selectors: {
        '::before': {
          height: '2px', // Adjust the thickness here
          backgroundColor: getTheme().palette.themePrimary,
        },
      },
    },
  };

  const navigate = useNavigate();

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'Home',
          url: '/',
          key: 'key1',
          onClick: (ev, item) => {
            ev?.preventDefault();
            navigate('/');
          }
        },
        {
          name: 'About',
          url: 'about',
          key: 'key2',
          onClick: (ev, item) => {
            ev?.preventDefault();
            navigate('/about');
          }
        },
      ],
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Nav groups={navLinkGroups} styles={navStyles} />
      <div style={{ margin: '16px' }}>
        <Separator styles={separatorStyles} />
        {userContext !== null &&
          <Text style={{ fontSize: FontSizes.mediumPlus }}>
            {userContext.email}
          </Text>
        }
      </div>
    </div>
  );
};
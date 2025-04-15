
import React from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import { DefaultButton, FontSizes, getTheme, IContextualMenuProps, ISeparatorStyles, Separator } from '@fluentui/react';
import { IdentityApiClient } from '../clients/IdentityApiClient';
import { getConfig } from '../utils/Config';

export interface NavbarProps {
  userContext: UserContext | null;
  setUserContext: (userContext: UserContext | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userContext, setUserContext }: NavbarProps) => {
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

  const config = getConfig();

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'logout',
        text: 'Logout',
        iconProps: { iconName: 'SignOut' },
        onClick: (ev) => {
          new IdentityApiClient(config.STOCKSDEMOAPI_URL)
            .logout()
            .then(() => setUserContext(null));
        },
      },
    ],
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Nav groups={navLinkGroups} styles={navStyles} />
      <div style={{ margin: '16px' }}>
        <Separator styles={separatorStyles} />
        <DefaultButton
          split
          disabled={!userContext}
          menuProps={menuProps}
          text={userContext?.email ?? "Not logged in"}
          onClick={_ => setUserContext(null)}
          styles={{ splitButtonMenuButton: { backgroundColor: 'white' } }} />
      </div>
    </div>
  );
};
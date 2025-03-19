
import React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { initializeIcons, ThemeProvider } from '@fluentui/react';

export const Navbar: React.FC = () => {

  const navStyles: Partial<INavStyles> = {
  };

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'Home',
          url: 'http://example.com',
          expandAriaLabel: 'Expand Home section',
          links: [
            {
              name: 'Activity',
              url: 'http://msn.com',
              key: 'key1',
              target: '_blank',
            },
            {
              name: 'MSN',
              url: 'http://msn.com',
              disabled: true,
              key: 'key2',
              target: '_blank',
            },
          ],
          isExpanded: true,
        },
        {
          name: 'Documents',
          url: 'http://example.com',
          key: 'key3',
          isExpanded: true,
          target: '_blank',
        },
        {
          name: 'Pages',
          url: 'http://msn.com',
          key: 'key4',
          target: '_blank',
        },
        {
          name: 'Notebook',
          url: 'http://msn.com',
          key: 'key5',
          disabled: true,
        },
        {
          name: 'Communication and Media',
          url: 'http://msn.com',
          key: 'key6',
          target: '_blank',
        },
        {
          name: 'News',
          url: 'http://cnn.com',
          icon: 'News',
          key: 'key7',
          target: '_blank',
        },
      ],
    },
  ];

  return (
    <Nav groups={navLinkGroups} styles={navStyles} />
  );
};


import React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {

  const navStyles: Partial<INavStyles> = {
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
    <Nav groups={navLinkGroups} styles={navStyles} />
  );
};
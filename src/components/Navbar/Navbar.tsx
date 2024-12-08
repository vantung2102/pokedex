import clsx from 'clsx';
import { IconType } from 'react-icons';

import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';

import { TfiCup } from 'react-icons/tfi';
import { LuGamepad2 } from 'react-icons/lu';
import { GiCardPlay } from 'react-icons/gi';
import { CiSquareInfo } from 'react-icons/ci';
import { FaRegNewspaper } from 'react-icons/fa';
import { MdOutlineCatchingPokemon, MdOndemandVideo } from 'react-icons/md';

const AcmeLogo = () => {
  return (
    <svg
      fill='none'
      height='36'
      viewBox='0 0 32 32'
      width='36'
    >
      <path
        clipRule='evenodd'
        d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </svg>
  );
};

const navItems = [
  { label: 'Pokedex', link: '#', icon: MdOutlineCatchingPokemon, color: 'bg-red-500' },
  { label: 'Games & Apps', link: '#', icon: LuGamepad2, color: 'bg-amber-500' },
  { label: 'Card Game', link: '#', icon: GiCardPlay, color: 'bg-cyan-500' },
  { label: 'Animation', link: '#', icon: MdOndemandVideo, color: 'bg-green-500' },
  { label: 'Event', link: '#', icon: TfiCup, color: 'bg-violet-500' },
  { label: 'News', link: '#', icon: FaRegNewspaper, color: 'bg-fuchsia-500' },
  { label: 'About Us', link: '#', icon: CiSquareInfo, color: 'bg-rose-500', rounded: 'br' },
];

export interface NavItemProps {
  icon: IconType;
  label: string;
  link: string;
  color: string;
  rounded?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, link, color, rounded }) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center relative px-5',
      `after:absolute after:content-[''] after:${color} after:left-0 after:bottom-[-13px] after:w-full after:h-1.5`,
      { [`after:rounded-${rounded}`]: rounded },
    )}
  >
    <a
      href={link}
      className='flex flex-col items-center justify-center text-gray-500'
    >
      <Icon className='size-7' />
      <span className='text-sm'>{label}</span>
    </a>
  </div>
);

export function Navbar() {
  return (
    <NavbarNextUI
      isBordered
      maxWidth='2xl'
      className='bg-gray-100'
    >
      <NavbarContent
        as='div'
        className='items-center'
        justify='start'
      >
        <div className='flex justify-center items-center'>
          <img
            className='w-1/2'
            alt='pokemon logo'
            src='/images/pokemon-logo.png'
          />
        </div>
      </NavbarContent>
      <NavbarContent justify='center'>
        <NavbarContent className='hidden sm:flex gap-0'>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              link={item.link}
              color={item.color}
              rounded={item.rounded}
            />
          ))}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent
        as='div'
        className='items-center'
        justify='end'
      >
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Jason Hughes'
              size='sm'
              src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Profile Actions'
            variant='flat'
          >
            <DropdownItem
              key='profile'
              className='h-14 gap-2 text-slate-600'
            >
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>zoey@example.com</p>
            </DropdownItem>
            <DropdownItem
              className='text-slate-600'
              key='settings'
            >
              My Settings
            </DropdownItem>
            <DropdownItem
              className='text-slate-600'
              key='team_settings'
            >
              Team Settings
            </DropdownItem>
            <DropdownItem
              className='text-slate-600'
              key='analytics'
            >
              Analytics
            </DropdownItem>
            <DropdownItem
              className='text-slate-600'
              key='system'
            >
              System
            </DropdownItem>
            <DropdownItem
              className='text-slate-600'
              key='configurations'
            >
              Configurations
            </DropdownItem>
            <DropdownItem
              className='text-slate-600'
              key='help_and_feedback'
            >
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              className='text-slate-600'
              key='logout'
              color='danger'
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NavbarNextUI>
  );
}

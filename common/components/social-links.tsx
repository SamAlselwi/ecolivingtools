'use clinet';

import '@/common/styles/social-links.css';
import Image, { StaticImageData } from 'next/image';
//social icons
import pinterest from '@/public/images/social/pinterest.png';
import twitter from '@/public/images/social/twitter.png';
import instagram from '@/public/images/social/instagram.png';
import youtube from '@/public/images/social/youtube.png';
// import linkedin from '@/public/images/social/linkedin.png';
// import facebook from '@/public/images/social/facebook.png';
import { AppIcon } from '.';

interface SocialLinksItem {
  type: string;
  url: string;
  icon: StaticImageData;
  name: string;
  username: string;
  iconId: string;
}

export const items: SocialLinksItem[] = [
  {
    name: 'Pinterest',
    type: 'pinterest',
    url: 'https://www.pinterest.com/theretools/',
    icon: pinterest,
    username: '@theretools',
    iconId: 'pinterest-p',
  },
  {
    name: 'X',
    type: 'twitter',
    url: 'https://x.com/ecolivingtools',
    icon: twitter,
    username: '@ecolivingtools',
    iconId: 'x-twitter',
  },
  {
    name: 'Instagram',
    type: 'instagram',
    url: 'https://www.instagram.com/there_tools/',
    icon: instagram,
    username: '@there.tools',
    iconId: 'instagram',
  },
  {
    name: 'Youtube',
    type: 'youtube',
    url: 'https://www.youtube.com/@99cells',
    icon: youtube,
    username: '@theretools',
    iconId: 'youtube',
  },
  // {
  //   name: 'Linkedin',
  //   type: 'linkedin',
  //   url: 'https://www.linkedin.com/company/99cells/',
  //   icon: linkedin,
  //   username: '@99cells',
  //   iconId: 'linkedin-in',
  // },
  // {
  //   name: 'Facebook',
  //   type: 'facebook',
  //   url: 'https://www.facebook.com/profile.php?id=100088103696339',
  //   icon: facebook,
  //   username: '@99cells',
  //   iconId: 'facebook-f',
  // },
];

const SocialLinks = () => {
  return (
    <div className="social-list">
      <ul className="social-links-list">
        {items.map((item) => (
          <li className="social-links-item" key={`social-${item.type}`}>
            <a
              className="social-links-link"
              href={item.url}
              target="_blank"
              key={`social-click-${item.type}`}
            >
              {item.type === 'twitter' && (
                <AppIcon name={'x-twitter'} size="30" />
              )}
              {item.type !== 'twitter' && (
                <Image
                  src={item.icon}
                  alt={`${process.env.NEXT_PUBLIC_APP_NAME} ${item.type}`}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;

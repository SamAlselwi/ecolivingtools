'use client';
import React from 'react';
import '@/common/styles/share-buttons.scss';
import AppIcon from './icon';

interface ShareButtonDef {
  url: string;
  icon: string;
  iconCom: React.JSX.Element;
  label?: string;
}

interface ShareButtonUserDef {
  type: string;
  label?: string;
  icon?: string;
}

interface ShareButton {
  type: string;
  url: string;
  label: string;
  icon: string;
  iconCom: React.JSX.Element;
}

type ShareButtonsList = string | Array<string | ShareButtonUserDef>;

const makeShareUrl = (baseUrl: string, itemUrl: string, itemTitle: string, itemImage: string): string => {
  let pageUrl = '';
  let pageTitle = '';
  let pageImage = '';

  pageUrl = window.location.href;

  pageUrl = pageUrl;
  // pageUrl = itemUrl || pageUrl;
  pageTitle = itemTitle || pageTitle;
  pageImage = itemImage || pageImage;

  return baseUrl
      .replace('%URL%', encodeURIComponent(pageUrl))
      .replace('%TITLE%', encodeURIComponent(pageTitle))
      .replace('%IMAGE%', encodeURIComponent(pageImage));
}

const shareButtonsDef: Record<string, ShareButtonDef> = {
  facebook: {
      url: 'https://www.facebook.com/sharer/sharer.php?u=%URL%',
      icon: 'fab fa-facebook-f',
      iconCom: <AppIcon name={'facebook-f'} size="12" />,
      label: 'Like',
  },
  twitter: {
      url: 'https://twitter.com/share?url=%URL%',
      icon: 'fa-brands fa-x-twitter',
      iconCom: <AppIcon name={'x-twitter'} size="12" />,
      label: 'Tweet',
  },
  pinterest: {
      url: 'https://pinterest.com/pin/create/button/?url=%URL%&media=%IMAGE%&description=%TITLE%',
      icon: 'fab fa-pinterest',
      iconCom: <AppIcon name={'pinterest-p'} size="12" />,
      label: 'Pin It',
  },
  whatsapp: {
      url: 'https://wa.me/?text=%URL%',
      icon: 'fab fa-whatsapp',
      iconCom: <AppIcon name={'fa-whatsapp'} size="12" />,
      label: 'Share',
  },
  linkedin: {
      url: 'https://www.linkedin.com/shareArticle?title=%TITLE%&url=%URL%',
      iconCom: <AppIcon name={'linkedin-in'} size="12" />,
      icon: 'fab fa-linkedin',
      label: 'Share',
  },
  ok: {
      url: 'https://connect.ok.ru/offer?url=%URL%&title=%TITLE%&imageUrl=%IMAGE%',
      icon: 'fab fa-odnoklassniki',
      iconCom: <AppIcon name={'odnoklassniki'} size="12" />,
      label: 'Share',
  },
  vk: {
      url: 'https://vk.com/share.php?url=%URL%',
      icon: 'fab fa-vk',
      iconCom: <AppIcon name={'vk'} size="12" />,
      label: 'Share',
  },
  telegram: {
      url: 'https://telegram.me/share/url?url=%URL%&text=%TITLE%',
      icon: 'fas fa-paper-plane',
      iconCom: <AppIcon name={'odnoklassniki'} size="12" />,
      label: 'Share',
  },
  email: {
      url: 'mailto:?to=&subject=%TITLE%&body=%URL%',
      icon: 'fas fa-envelope',
      iconCom: <AppIcon name={'odnoklassniki'} size="12" />,
      label: 'Share',
  },
};


interface Prop {
  buttons: ShareButtonsList;
  showLabels?: boolean;
  showIcons?: boolean;
  pageUrl: string;
  pageTitle: string;
  pageImage: string;
}

const ShareButtons = ({buttons, showLabels = true, showIcons = true, pageUrl = '', pageTitle = '', pageImage = ''}: Prop) => {

  const [items, setItems] = React.useState<ShareButton[]>([])

  React.useEffect(() => {
    let value = buttons;
    
    if (typeof value === 'string') {
      value = value.split(',');
    }

    const list = value.map(x => {
      const userDef: ShareButtonUserDef = typeof x === 'string' ? {type: x} : x;
      const type = userDef.type;
      const def = shareButtonsDef[type];

      if (!def) {
          return null;
      }

      return {
          type,
          url: makeShareUrl(def.url, pageUrl, pageTitle, pageImage),
          label: typeof userDef.label === 'string' ? userDef.label : def.label,
          icon: typeof userDef.icon === 'string' ? userDef.icon : def.icon,
          iconCom: def.iconCom
      } as ShareButton;
    }).filter(x => x !== null) as ShareButton[];

    setItems(list);

  }, []);


  return (
    <>
    <ul className="share-buttons__list">
      {/* [class.share-buttons__item--without-label]="!(item.label && showLabels)" */}
      {items.map((item, index) => (
        <li className={`share-buttons__item share-buttons__item--type--${item.type}`} key={`share-icon-${index}`}>
            <a href={item.url} target="_blank" >
              {item.icon && showIcons && <i className={`share-buttons__item-icon ${item.icon}`}>
                  {item.iconCom}
                </i>}
              {item.label && showLabels && <span  className="share-buttons__item-label">{ item.label }</span>}
            </a>
        </li>
      ))}
  </ul>

    </>
  )

}

export default ShareButtons;



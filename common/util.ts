import { NextRequest } from "next/server";
import { MetadataType, MetaItem } from "./interfaces";
import { format } from "date-fns";

/**************** START Metadata METHODS ***********************/
export const getMetadataDetailsPage = (item: any) => {
  let meta = {
    title: item.title,
    description: item.description,
    openGraph: {
      type: item.type,
      title: item.title,
      description: item.description,
      url: item.url,
      images: {
        url: item.fullImage,
        secureUrl: item.fullImage,
        alt: item.slgu,
      }
    },
    twitter: {
      title: item.title,
      description: item.description,
      images: {
        url: item.fullImage,
        secureUrl: item.fullImage,
        alt: item.slgu,
      }
    },
    alternates: {
      canonical: item.url,
      languages: {
        'en-us': item.url,
        'en-ca': item.url,
        'en': item.url,
        'x-default': item.url,
      }
    }
  };
  if(item.notIndexable){
    return {...meta, robots: {index: false, follow: false}};
  }
  return meta;
}

/**
 * for tag && category meta data
 * @param item 
 * @returns 
 */
export const getMetadata = (item: MetaItem) => {
  const metaDescription = item.metaDescription ? item.metaDescription : item.description;
  const metaTitle = item.metaTitle ? (`${item.metaTitle} - ${process.env.APP_NAME}`) : '';
  const name = item.title ? item.title : item.name;
  let title = `${name} | Eco Friendly Tools and Ideas - ${process.env.APP_NAME}`;
  title = metaTitle ? metaTitle : title;
  return {
    title: `${title}`,
    description: metaDescription,
    openGraph: {
      type: item.type,
      title: title,
      description: metaDescription,
      url: item.url,
      images: {
        url: `${process.env.BASE_URL}/ecolivingtools.png`,
        secureUrl: `${process.env.BASE_URL}/ecolivingtools.png`,
        alt: `${title}`,
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title}`,
      description: metaDescription,
      images: [`${process.env.BASE_URL}/ecolivingtools.png`],
    },
    alternates: {
      canonical: item.url,
      languages: {
        'en-us': item.url,
        'en-ca': item.url,
        'en': item.url,
        'x-default': item.url,
      }
    }
  }
}

export const mapMetaItem = (item: any, url: string, type: MetadataType = 'website', category: string = 'Technology'): MetaItem => {
  let title = item.title ? item.title : item.name;
  let metaDescription = item.metaDescription ? item.metaDescription : item.description;
  const baseUrl = `${process.env.BASE_URL}${url}`
  return <MetaItem>{
    title: title,
    name: title,
    description: item.description,
    image: item.image ? item.image : `${process.env.BASE_URL}/ecolivingtools.png`,
    url: baseUrl,
    type: item.type ? item.type : 'website',
    category: category,
    metaDescription: metaDescription
  }
}
/**************** END Metadata METHODS ***********************/

interface ErrorI18n {
  [language: string]: ErrorObj;
}

interface ErrorObj {
  name: string;
  title: string;
  msg: string;
}

const getError = (errorObj: ErrorI18n, request: NextRequest) => {
  const language = request.headers.get('content-language') || 'en';
  let error = errorObj[language];
  return {
      name: error.name,
      title: error.title,
      msg: error.msg
  }
};


export const formatDate = (date: Date, fr = 'yyyy-mm-dd') => {
  return format(date, fr);
}

const util = {
  getError
}
export default util;

"use clinet";
import Link from "next/link";
import Image from "next/image";
import "@/common/styles/banner.scss";
import { ShortPost } from "../interfaces";

interface Prop {
  primaryItem: ShortPost;
  secondaryItems: ShortPost[];
}

const Banners = ({ primaryItem, secondaryItems }: Prop) => {
  return (
    <div className="container banner-container" key="banner-container">
      <div className="grid-content" key="grid-banner-container">
        {/* primary */}
        <div className="featured-primary" key="featured-primary">
          <div className="banner-primary" key="banner-primary">
            <Link
              href={`/${primaryItem.slug}`}
              className="block-banner__body"
              key="banner-primary-body"
              aria-label={`Read more about ${primaryItem.name}`}
            >
              <div
                className="block-banner__image block-banner__image--desktop"
                key="banner-primary-image"
              >
                <Image
                  src={primaryItem.image.full!}
                  alt={primaryItem.name}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
            <div className="banner-info" key="banner-primary-info">
              <div className="banner-chip" key="banner-primary-chip">
                {primaryItem.categories?.length &&
                  primaryItem.categories.map((cate, index) => (
                    <div className="category" key="banner-primary-category">
                      <Link
                        href={
                          cate.inRoot
                            ? `/${cate.slug}`
                            : `/category/${cate.slug}`
                        }
                        className="category-link bg-secondary text-secondary-foreground"
                        key="banner-primary-category-link"
                      >
                        {cate?.name.toUpperCase()}
                      </Link>
                    </div>
                  ))}
              </div>
              <Link href={`/${primaryItem.slug}`} key="banner-primary-title" 
              aria-label={`Read more about ${primaryItem.name}`}
              >
                <h3 className="banner-title">{primaryItem.name}</h3>
              </Link>
            </div>
          </div>
        </div>
        {/* secondary */}
        <div className="featured-secondary" key="featured-secondary">
          <div className="banner-secondary" key="banner-secondary">
            {secondaryItems.map((item) => (
              <div className="banner-col" key={`banner-col-${item.id}`}>
                <Link
                  href={`/${item.slug}`}
                  className="block-banner__body"
                  key={`banner-secondary-${item.id}-body`}
                  aria-label={`Read more about ${item.name}`}
                >
                  <div
                    className="block-banner__image block-banner__image--desktop"
                    key={`banner-secondary-image-${item.id}`}
                  >
                    <Image
                      src={item.image.full!}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
                <div className="banner-info" key={`banner-secondary-info`}>
                  <div className="banner-chip" key={`banner-secondary-chip`}>
                    {item.categories?.length &&
                      item.categories.map((cate, index) => (
                        <div
                          className="category"
                          key={`banner-secondary-category-${cate.id}`}
                        >
                          <Link
                            href={
                              cate.inRoot
                                ? `/${cate.slug}`
                                : `/category/${cate.slug}`
                            }
                            className="category-link bg-secondary text-secondary-foreground"
                            key={`banner-secondary-category-link-${cate.id}`}
                          >
                            {cate?.name.toUpperCase()}
                          </Link>
                        </div>
                      ))}
                  </div>
                  <Link 
                    href={`/${item.slug}`} 
                    key="banner-secondary-title"
                    aria-label={`Read more about ${item.name}`}
                  >
                    <h3 className="banner-title">{item.name}</h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banners;

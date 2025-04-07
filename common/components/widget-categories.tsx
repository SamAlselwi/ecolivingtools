import Link from 'next/link';
import '@/common/styles/widget-categories.scss';
import { CategoryItem } from '../interfaces';

interface Prop {
  position?: 'blog' | 'shop';
  categories: CategoryItem[];
}

const generateLinks = (categories: CategoryItem[]) => {
  if (!categories) {
    return; // or return an empty array, empty string, etc., depending on your needs.
  }

  return categories.map((category) => {
    if (category.slug) {
      return (
        <li
          className="widget-categories__item"
          key={`widget-categories-item-${category.id}`}
        >
          <div className="widget-categories__row">
            <Link 
            className='hover:underline' 
            href={category.inRoot ? `/${category.slug}` : `/category/${category.slug}`}
            aria-label={`View all posts in ${category.name}`}>{category.name}</Link>
          </div>
        </li>
      );
    } else {
      return null; // or return an empty string if preferred: '';
    }
  });
};

const WidgetCategories = ({ categories, position = 'blog' }: Prop) => {
  return (
    <div
      className={`widget-categories widget-categories--location--${position} widget`}
      key={'widget-categories'}
    >
      <div className="widget__title text-xl font-semibold" key={'widget-categories-title'}>
        {'Categories'}
      </div>
      <ul className="widget-categories__list">
        {generateLinks(categories)}
      </ul>
    </div>
  );
};

export default WidgetCategories;
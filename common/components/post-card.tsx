import Link from "next/link";
import { ShortPost } from "../interfaces";
import "@/common/styles/post-card.scss";

interface Prop {
  post: ShortPost;
  hideDesc?: boolean;
}

const generateLinks = (post: ShortPost) => {
  if (!post.categories) {
    return; // or return an empty array, empty string, etc., depending on your needs.
  }
  return post.categories.map((category, i) => {
    if (category.slug) {
      return (
        <Link
          href={category.inRoot ? `/${category.slug}` : `/category/${category.slug}`}
          key={`post-category-${category.id}-${post.id}`}
        >
          {category.name} {post.categories?.length !== i + 1 ? "," : ""}{" "}
        </Link>
      );
    } else {
      return null; // or return an empty string if preferred: ''
    }
  });
};

const PostCard = ({ post, hideDesc = false }: Prop) => {
  const getDescription = () => {
    const description: string = `${post.description}`;
    return description.length > 300
      ? `${description.slice(0, 300)}...`
      : description;
  };

  return (
    <>
      <div className="post-card__image" key={`post-card-image-${post.id}`}>
        <Link href={`/${post.slug}`}>
          <img src={post.image.full!} alt={post.name} />
        </Link>
        {/* <a key={`post-card-image-click-${post.id}`}>
          <img src={post.image.full!} alt={post.name} />
        </a> */}
      </div>
      <div className="post-card__info" key={`post-card-info-${post.id}`}>
        <div
          className="post-card__category"
          key={`post-card-category-${post.id}`}
        >
          {generateLinks(post)}
        </div>
        <div className="post-card__name" key={`post-card-name-${post.id}`}>
          <Link href={`/${post.slug}`} key={`post-card-name-click-${post.id}`}>
            {post.name}
          </Link>
        </div>
        {/* <div className="post-card__date" key={`post-card-date-${post.id}`}>
          {post.createdAt}
        </div> */}
        {!hideDesc && (
          <div
            className="post-card__content"
            key={`post-card-content-${post.id}`}
          >
            {getDescription()}
          </div>
        )}
      </div>
    </>
  );
};

export default PostCard;

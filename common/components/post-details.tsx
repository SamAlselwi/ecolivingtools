"use client";
import Link from "next/link";
import React from "react";
import { PostCard, ShareButtons, Sidebar } from "@/common/components";
import "@/common/styles/content-styles.css";
import { IPost, ShortPost } from "../interfaces";

interface Prop {
  post: IPost;
  related?: ShortPost[];
}

const sidebarPosition: "start" | "end" = "end"; // For LTR scripts "start" is "left" and "end" is "right"

const PostDetails = ({ post, related }: Prop) => {
  return (
    <div className="container py-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-2/3" key="post-details">
          {/* Post header (title, updated date) */}
          <div className="mb-6">
            <h1 className="mb-1 font-bold text-2xl md:text-4xl">{post.name}</h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {post.updatedAt}
            </p>
          </div>
          {/* Featured Image */}
          {!post.hideBanner && post.image?.full && (
            <div className="relative mb-6 overflow-hidden rounded text-center">
              <img
                src={post.image.full}
                alt={post.slug}
                className="w-full transition-opacity duration-200 hover:opacity-80"
              />
            </div>
          )}

          {/* Post Content */}
          <div
            className="prose dark:prose-invert ck-content mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Footer: Tags + Share Buttons */}
          <div className="mt-4">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              {/* Tags */}
              <div className="mb-4 sm:mb-0">
                <div className="flex flex-wrap gap-2 justify-center">
                  {post.tags.map((tag) => (
                    <Link
                      href={`/${tag.slug}`}
                      key={`tag-item-${tag.id}`}
                      className="rounded border border-gray-300 px-2 py-1 text-sm transition-colors hover:bg-gray-200"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <ShareButtons
                buttons={[
                  'facebook',
                  { type: 'twitter', label: 'Tweet' },
                  'pinterest',
                  'linkedin',
                  'whatsapp',
                ]}
                pageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`}
                pageTitle={post.name}
                pageImage={post.image?.thumbnail ?? ''}
              />
            </div>
          </div>

          {/* Related Posts */}
          {related && related.length > 0 && (
            <section className="mt-16">
              <h4 className="mb-7 flex items-center text-2xl font-semibold">
                Recommended
                <span className="ml-4 h-[2px] flex-grow bg-gray-200"></span>
              </h4>
              <div className="-m-2 flex flex-wrap">
                {related.map((item) => (
                  <div
                    className="w-full p-2 sm:w-1/2 post-card post-card--layout--related"
                    key={`related-item-${item.id}`}
                  >
                    <PostCard post={item} hideDesc={true} />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column / Sidebar */}
        {sidebarPosition === "end" && (
          <div className="w-full lg:w-1/3" key="end-sidebar">
            <Sidebar position="end" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;

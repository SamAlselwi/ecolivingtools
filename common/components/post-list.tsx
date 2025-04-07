"use client"

import "../styles/posts-list.scss" // keep if you still want your SCSS
import React from "react";
import { getRequest, limit } from "../services";
import { Message, Sidebar, PostCard } from ".";
import { useProgress } from "../services/client.service";
// shadcn/ui
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// interfaces
import { ShortPost, FetchResponse } from "../interfaces";
import { useToast } from "@/hooks/use-toast";
// styles

interface Prop {
  items: ShortPost[]
  hasMore?: boolean
  tag?: string
  category?: string
}

const PostList = ({ items, hasMore = true, tag, category }: Prop) => {
  const { toast } = useToast()

  const [posts, setPosts] = React.useState<ShortPost[]>(items)
  const [skip, setSkip] = React.useState(limit)
  const [hasNextPage, setHasNextPage] = React.useState(hasMore)

  const { isLoading, updateProgress } = useProgress()

  if (!posts.length) {
    return (
      <Message message="No posts available at the moment. Please check back later!" />
    )
  }

  const fetchNextPage = async () => {
    updateProgress(true, false)
    try {
      const res = await getRequest<ShortPost, FetchResponse<ShortPost>>("/posts", {
        skip,
        limit,
        tag: tag || null,
        category: category || null,
      })
      const list = Array.isArray(res.data) ? res.data : []
      setPosts((prev) => [...prev, ...list])

      if (list.length >= limit) setHasNextPage(true)
      else setHasNextPage(false)

      setSkip(skip + limit)
      updateProgress(false, false)
    } catch (ex) {
      updateProgress(false, false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "server error",
      })
    }
  }

  const sidebarPosition: "start" | "end" = "end" // For demonstration

  return (
    <div className="container">
      {/* Use Tailwind flex / grid to replace <Row> and columns */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main content */}
        <div className="w-full lg:w-8/12">
          <div className="block">
            <div className="posts-view">
              <div className="posts-list posts-list--layout--classic">
                <div className="posts-list__body" id="scrollRoot">
                  {posts.map((post) => (
                    <div
                      className="posts-list__item"
                      key={`posts-list__item-${post.id}`}
                    >
                      <div
                        className="post-card post-card--layout--list post-card--size--nl"
                        key={post.id}
                      >
                        <PostCard post={post} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="posts-view__pagination">
                <div className="form-group">
                  {hasNextPage ? (
                    <Button
                      variant={'secondary'}
                      onClick={fetchNextPage}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && <Loader2 className="animate-spin" />}
                      {isLoading ? "Loading..." : "See More Results"}
                    </Button>
                  ) : (
                    <h5 className="text-center">
                      We're still growing! Check back soon for more content.
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarPosition === "end" && (
          <div className="w-full lg:w-4/12">
            <Sidebar position="end" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostList

"use client";

//react
import React, { useState } from "react";
//
import { useDebouncedCallback } from "use-debounce";
//components
import { ImageWithPlaceholder } from "@/common/components";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
//services
import { getRequest, limit } from "@/common/services";
//interfaces
import { FetchResponse, ShortPost } from "@/common/interfaces";

interface IQueryFilter {
  limit: number;
  skip: number;
  q?: string;
  isLoadMore?: boolean;
}

interface Prop {
  posts: ShortPost[];
}

const SearchResults = ({ posts }: Prop) => {
  const [skip, setSkip] = useState(limit);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShortPost[]>(posts);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isSearchingResult, setIsSearchingResult] = useState<boolean>(false);


  const fetchPosts = async (p: IQueryFilter) => {
    try {
      const {isLoadMore} = p;
      const res = await getRequest<ShortPost, FetchResponse<ShortPost>>('/posts', p);
      const items = Array.isArray(res.data) ? res.data : [];
      setResults((prev) => (isLoadMore ? [...prev, ...items] : items));
      setHasMore(items.length === limit);
      setSkip((prevSkip) => prevSkip + limit);
      setLoading(false);
      setLoadingMore(false);
    } catch (ex) {
        setLoading(false);
        setLoadingMore(false);
    }
  };

  const debounced = useDebouncedCallback(
    () => {
      setSkip(0);
      setIsSearchingResult(true);
      reload();
    },
    400,
    { maxWait: 1000 }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingResult(true);
    reload();
  };

  const reload = () => {
    setLoading(true);
    setSkip(0);
    // Build updated params
    const newParams: IQueryFilter = {
      limit,
      skip: 0,
      q: query,
      isLoadMore: false,
    };

    fetchPosts(newParams);
  };

  const loadMore = () => {
    setLoadingMore(true);
    if (!query) {
      setIsSearchingResult(false);
    }
    const newParams: IQueryFilter = {
      limit,
      skip,
      q: query,
      isLoadMore: true,
    };
    fetchPosts(newParams);
  };

  return (
    <div className="container search-container mt-4 px-4">
      {/* Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Text input */}
        <div className="md:col-span-10">
          <form onSubmit={handleSearch} className="mb-3">
            <label
              htmlFor="searchInput"
              className="block font-bold text-base mb-1 text-foreground"
            >
              What would you like to search for?
            </label>
            <input
              id="searchInput"
              type="text"
              placeholder="e.g. 'smart devices', 'smartphone', 'gadgets'..."
              autoFocus
              value={query}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);
                debounced();
              }}
              className="w-full border-2 border-secondary rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
            />
          </form>
        </div>

        {/* Search button */}
        <div className="md:col-span-2 flex items-end mb-3">
          <Button
            type="submit"
            onClick={handleSearch}
            className="w-full py-2 px-4 rounded search-btn"
            variant={"secondary"}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="search-posts-row mt-4">
        {/* Loading Spinner (if loading + not loadingMore) */}
        {loading && !loadingMore && (
          <div className="text-center my-3 mx-auto flex">
            {/* Spinner */}
            <div className="mx-auto">
              <Loader2 className="animate-spin" />
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="search-posts-list">
            <div className="search-posts-list__body flex flex-wrap gap-4 justify-center">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="search-posts-list__item w-[280px] shadow-inner rounded-b-lg"
                >
                  <div className="search-post-card">
                    <div className="search-post-card__image relative overflow-hidden rounded-t-lg">
                      <ImageWithPlaceholder
                        src={item.image.full || ""}
                        alt={item.name}
                        linkHref={`/${item.slug}`}
                        width="100%"
                        className="object-cover w-full h-auto"
                      />
                    </div>
                    <div className="search-post-card__info text-center">
                      <div className="search-post-card__name flex items-center justify-center font-medium text-lg p-2 h-[80px]">
                        <a
                          href={`/${item.slug}`}
                          className="hover:underline text-foreground"
                        >
                          {item.name}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && query !== "" && (
          <p className="text-center mt-3">
            No results found for <strong>{query}</strong>.
          </p>
        )}

        {/* “Load More” / Pagination */}
        {!loading && (
          <div className="posts-view__pagination mt-4 flex justify-center">
            {hasMore ? (
              <Button
                variant="secondary"
                disabled={!hasMore || loading || loadingMore}
                onClick={loadMore}
              >
                {loadingMore && <Loader2 className="animate-spin" />}
                {hasMore
                  ? "See More Results"
                  : "We're still growing! Check back soon for more content."}
              </Button>
            ) : (
              !isSearchingResult && (
                <h5 className="text-center">
                  {"We're still growing! Check back soon for more content."}
                </h5>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

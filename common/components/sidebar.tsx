"use client"

import React from "react"
import "@/common/styles/block-sidebar.scss"
import { CategoryItem } from "../interfaces"
import { getCachedRequest, setItems, getItems } from "../services"

// 1) Import the Skeleton from shadcn/ui
import { Skeleton } from "@/components/ui/skeleton"
import WidgetCategories from "./widget-categories"

interface Prop {
  position?: "start" | "end"
}

const Sidebar = ({ position = "start" }: Prop) => {
  // For loading placeholders
  const placeholderArray = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10]

  // Retrieve any cached items
  const cachedItems = getItems()
  const items = Array.isArray(cachedItems) && cachedItems.length ? cachedItems : []

  const [isLoading, setIsLoading] = React.useState(items.length ? false : true)
  const [categories, setCategories] = React.useState<CategoryItem[]>(items)

  React.useEffect(() => {
    const abortController = new AbortController();
  
    if (categories.length) {
      return;
    }
  
    getCachedRequest("/categories", { signal: abortController.signal })
      .then((res: any) => {
        const items = Array.isArray(res.data) ? res.data : [];
        setCategories(items);
        setItems(items);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setIsLoading(false);
        }
      });
  
    return () => abortController.abort();
  }, [categories]);
  
  return (
    <div className={`block block-sidebar block-sidebar--position--${position}`}>
      <div className="block-sidebar__item">
        {/** Loading skeletons */}
        <div>
          {isLoading &&
            placeholderArray.map((val, index) => (
              <div key={`sidebar-skeleton-${index}`} className="mb-2">
                <Skeleton className="mb-1 h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-2/3 bg-muted" />
              </div>
            ))}
        </div>

        {/** Render your widget once loading completes */}
        {!isLoading && <WidgetCategories categories={categories} />}
      </div>
    </div>
  )
}

export default Sidebar

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

interface VirtualizedMasonryProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columnWidth: number;
  gap: number;
  className?: string;
}

export function VirtualizedMasonry<T>({
  items,
  renderItem,
  columnWidth = 300,
  gap = 16,
  className = ''
}: VirtualizedMasonryProps<T>) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate number of columns based on container width
  const columnCount = useMemo(() => {
    if (containerWidth === 0) return 1;
    return Math.max(1, Math.floor((containerWidth + gap) / (columnWidth + gap)));
  }, [containerWidth, columnWidth, gap]);

  // Distribute items across columns for masonry layout
  const { columnItems, totalHeight } = useMemo(() => {
    const columns: T[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = new Array(columnCount).fill(0);

    items.forEach((item, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columns[shortestColumnIndex].push(item);
      
      // Estimate item height (you can customize this based on your content)
      const estimatedHeight = 200 + Math.random() * 200; // Random height estimation
      columnHeights[shortestColumnIndex] += estimatedHeight + gap;
    });

    return {
      columnItems: columns,
      totalHeight: Math.max(...columnHeights)
    };
  }, [items, columnCount, gap]);

  // Handle container resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Virtual scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const scrollTop = scrollRef.current.scrollTop;
      const containerHeight = scrollRef.current.clientHeight;
      
      // Calculate visible range with buffer
      const buffer = containerHeight;
      const startY = Math.max(0, scrollTop - buffer);
      const endY = scrollTop + containerHeight + buffer;
      
      // Convert to item indices (simplified)
      const itemHeight = 300; // Average item height
      const startIndex = Math.max(0, Math.floor(startY / itemHeight) - 5);
      const endIndex = Math.min(items.length, Math.ceil(endY / itemHeight) + 5);
      
      setVisibleRange({ start: startIndex, end: endIndex });
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [items.length]);

  return (
    <div ref={scrollRef} className={`relative overflow-auto ${className}`}>
      <div
        ref={containerRef}
        className="flex gap-4 justify-center"
        style={{ minHeight: totalHeight }}
      >
        {columnItems.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col gap-4"
            style={{ width: columnWidth }}
          >
            {column.map((item, itemIndex) => {
              const globalIndex = items.indexOf(item);
              const isVisible = globalIndex >= visibleRange.start && globalIndex <= visibleRange.end;
              
              return (
                <motion.div
                  key={globalIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0.3,
                    y: 0,
                    scale: isVisible ? 1 : 0.95
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: itemIndex * 0.05
                  }}
                  className={`${!isVisible ? 'pointer-events-none' : ''}`}
                >
                  {renderItem(item, globalIndex)}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
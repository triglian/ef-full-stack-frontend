import React, { useEffect, useRef, useState } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  MasonryCellProps,
  WindowScroller,
} from 'react-virtualized';

import { GalleryThumbnail } from '../GalleryThumbnail/GalleryThumbnail';

const THUMBNAIL_WIDTH = 220;
const GUTTER_WIDTH = 10;

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: THUMBNAIL_WIDTH,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: THUMBNAIL_WIDTH,
  spacer: GUTTER_WIDTH,
});

interface IMasonryDimensions {
  width: number;
  height: number;
}

const calculateMasonrySettings = () => {
  const columnCount = Math.floor(window.innerWidth / (THUMBNAIL_WIDTH + GUTTER_WIDTH));
  const masonryWidth = columnCount * (THUMBNAIL_WIDTH + GUTTER_WIDTH);
  const masonryHeight = window.innerHeight - 84;
  return {
    columnCount,
    masonryWidth,
    masonryHeight,
  };
};

interface IProps {
  imageData: IImageItem[];
}

const Gallery: React.FC<IProps> = ({ imageData }: IProps) => {
  const { masonryWidth, masonryHeight } = calculateMasonrySettings();
  const [masonryDimensions, setMasonryDimensions] = useState<IMasonryDimensions>({
    width: masonryWidth,
    height: masonryHeight,
  });

  // Array of images with authors
  const list: IImageItem[] = imageData.map((item) => {
    const ratio = item.width / item.height;
    item.width = THUMBNAIL_WIDTH;
    item.height = Math.floor(item.width / ratio);
    return item;
  });

  function cellRenderer({ index, key, parent, style }: MasonryCellProps) {
    const item = list[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <GalleryThumbnail imageDetails={item}></GalleryThumbnail>
        </div>
      </CellMeasurer>
    );
  }

  const masonryRef = useRef<Masonry>(null);
  useEffect(() => {
    const resizeHandler = () => {
      const { columnCount, masonryWidth, masonryHeight } = calculateMasonrySettings();
      cellPositioner.reset({
        columnCount,
        columnWidth: THUMBNAIL_WIDTH,
        spacer: GUTTER_WIDTH,
      });

      setMasonryDimensions({
        width: masonryWidth,
        height: masonryHeight,
      });

      if (masonryRef.current) {
        masonryRef.current.recomputeCellPositions();
      }
    };
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
  }, [masonryRef]);

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <Masonry
          style={{
            margin: '10px auto',
            outline: 'none',
          }}
          autoHeight
          height={height}
          ref={masonryRef}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          scrollTop={scrollTop}
          overscanByPixels={300}
          cellCount={list.length}
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          cellRenderer={cellRenderer}
          width={masonryDimensions.width}
        />
      )}
    </WindowScroller>
  );
};

export { Gallery };

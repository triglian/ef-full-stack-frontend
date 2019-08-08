import React, { useEffect, useRef, useState } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  MasonryCellProps,
} from 'react-virtualized';

import imageData from '../../data/images.json';
const THUMBNAIL_WIDTH = 220;
const GUTTER_WIDTH = 10;

interface IImageItem {
  download_url: string;
  width: number;
  height: number;
  author: string;
}

// Array of images with authors
const list: IImageItem[] = imageData.map((datum) => {
  const ratio = datum.width / datum.height;
  datum.width = THUMBNAIL_WIDTH;
  datum.height = datum.width / ratio;
  return datum;
});

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

function cellRenderer({ index, key, parent, style }: MasonryCellProps) {
  const datum = list[index];

  return (
    <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
      <div style={style}>
        <figure style={{ margin: 0 }}>
          <img
            src={datum.download_url}
            style={{
              background: 'gray',
              height: datum.height,
              width: datum.width,
            }}
            alt={`by ${datum.author}`}
          />
          <figcaption>{datum.author}</figcaption>
        </figure>
      </div>
    </CellMeasurer>
  );
}

interface IMasonryDimensions {
  width: number;
  height: number;
}
const Gallery: React.FC = () => {
  const [masonryDimensions, setMasonryDimensions] = useState<IMasonryDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const masonryRef = useRef<Masonry>(null);
  useEffect(() => {
    const resizeHandler = () => {
      const columnCount = Math.floor(window.innerWidth / (THUMBNAIL_WIDTH + GUTTER_WIDTH));
      cellPositioner.reset({
        columnCount,
        columnWidth: THUMBNAIL_WIDTH,
        spacer: GUTTER_WIDTH,
      });

      console.log(window.innerHeight);

      setMasonryDimensions({
        width: columnCount * (THUMBNAIL_WIDTH + GUTTER_WIDTH),
        height: window.innerHeight,
      });

      if (masonryRef.current) {
        masonryRef.current.recomputeCellPositions();
      }
    };
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
  }, [masonryRef]);

  return (
    <Masonry
      style={{
        margin: '0 auto',
      }}
      ref={masonryRef}
      autoHeight={false}
      cellCount={list.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={masonryDimensions.height}
      width={masonryDimensions.width}
    />
  );
};

export { Gallery };

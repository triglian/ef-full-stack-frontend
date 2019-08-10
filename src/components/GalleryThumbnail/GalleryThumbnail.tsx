import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GalleryThumbnailSkeleton } from './GalleryThumbnailSkeleton';

interface IProps {
  imageDetails: IImageItem;
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  figureCaption: {
    fontSize: '14px',
  },
});

const GalleryThumbnail: React.FC<IProps> = ({ imageDetails }: IProps) => {
  const { download_url, width, height, author, thumbnail_url, thumbnail_2x_url } = imageDetails;
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageLoadHandler = () => {
      setLoaded(true);
    };
    if (imageRef.current) {
      const imageEl = imageRef.current;
      if (imageEl.complete) {
        setLoaded(true);
      } else {
        imageEl.addEventListener('load', imageLoadHandler);
        return () => {
          imageEl && imageEl.removeEventListener('load', imageLoadHandler);
        };
      }
    }
  }, [imageRef]);

  const src = thumbnail_url ? thumbnail_url : download_url;
  let srcSet = thumbnail_url ? thumbnail_url : '';
  srcSet = thumbnail_2x_url ? `${srcSet}, ${thumbnail_2x_url} 2x` : srcSet;
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: 'relative',
          height,
          width,
        }}
      >
        {!loaded && <GalleryThumbnailSkeleton />}
        <img
          ref={imageRef}
          srcSet={srcSet}
          src={src}
          style={{
            opacity: loaded ? 1 : 0,
            height: height,
            width: width,
            transition: 'opacity 300ms ease',
          }}
          alt={`by ${author}`}
        />
      </div>

      <figcaption className={classes.figureCaption}>{author}</figcaption>
    </figure>
  );
};

export { GalleryThumbnail };

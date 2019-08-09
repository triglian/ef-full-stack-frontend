import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'inline-block',
    height: '100%',
    width: '100%',
    background: 'linear-gradient(-90deg, #F0F0F0 0%, #F8F8F8 50%, #F0F0F0 100%)',
    backgroundSize: '400% 400%',
    animation: '$pulsate 1.2s ease-in-out infinite',
  },
  '@keyframes pulsate': {
    '0%': {
      backgroundPosition: '0% 0%',
    },
    '100%': {
      backgroundPosition: '-135% 0%',
    },
  },
});

const GalleryThumbnailSkeleton: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export { GalleryThumbnailSkeleton };

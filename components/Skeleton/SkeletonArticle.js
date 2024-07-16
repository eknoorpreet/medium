import React from 'react';
import { renderRepeatedCmp } from '../../utils';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';
// import './SkeletonElement.module.css';

const SkeletonArticle = ({ type, firstEl }) => {
  const miniArticle = type === 'mini' || !firstEl;
  return (
    <div className='skeleton-wrapper'>
      <div className='skeleton-article'>
        {miniArticle ? (
          <SkeletonElement type='title' />
        ) : (
          <SkeletonElement type='thumbnail' />
        )}
        {renderRepeatedCmp(<SkeletonElement type='text' />, 3)}
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonArticle;

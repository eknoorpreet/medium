import React from 'react';
import { renderRepeatedCmp } from '../../utils';
import SkeletonElement from './SkeletonElement';
import Shimmer from './Shimmer';

export const SkeletonTags = () => {
  return (
    <>
      {renderRepeatedCmp(
        <div className='skeleton__tag-item'>
          {renderRepeatedCmp(<SkeletonElement type='text' />, 4)}
        </div>,
        10
      )}
      <Shimmer />
    </>
  );
};

export default SkeletonTags;

import React from 'react';
import CommonAdView from './CommonAdView';

export default function AdContainer({ screen, isCollapsible, forceHeight, forceType, style }) {
  return (
    <CommonAdView
      screen={screen}
      isCollapsible={isCollapsible}
      forceType={forceType}
      forceSize={forceHeight}
    />
  );
}

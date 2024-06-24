/* eslint-disable no-unused-vars */
// types/react-rating.d.ts
declare module 'react-rating' {
  import * as React from 'react'

  interface RatingProps {
    readonly?: boolean;
    fractions?: number;
    start?: number;
    stop?: number;
    step?: number;
    initialRating?: number;
    placeholderRating?: number;
    emptySymbol?: React.ReactNode | string;
    fullSymbol?: React.ReactNode | string;
    placeholderSymbol?: React.ReactNode | string;
    direction?: 'ltr' | 'rtl';
    onChange?: (value: number) => void;
    onClick?: (value: number) => void;
    onHover?: (value: number) => void;
  }

  export default class Rating extends React.Component<RatingProps, any> {}
}

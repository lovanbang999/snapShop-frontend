import React from 'react'
import Rating from 'react-rating'

interface CustomRatingProps {
  initialRating: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const CustomRating: React.FC<CustomRatingProps> = ({ initialRating, onChange, readonly }) => {
  const emptyStar = (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21 16.54 14.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 14.97 5.82 21 12 17.27z" fill="#ddd" />
    </svg>
  )

  const fullStar = (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21 16.54 14.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 14.97 5.82 21 12 17.27z" fill="#ffd700" />
    </svg>
  )

  return (
    <Rating
      initialRating={initialRating}
      emptySymbol={emptyStar}
      fullSymbol={fullStar}
      onChange={onChange}
      readonly={readonly}
    />
  )
}

export default CustomRating

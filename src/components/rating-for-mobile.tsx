const RatingForMobile = ({ rating }: { rating: number }) => {
  const fullStar = (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21 16.54 14.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 14.97 5.82 21 12 17.27z" fill="#ffd700" />
    </svg>
  )

  return (
    <div className="flex items-center border-[1px] border-[#ffea7a] px-1 max-w-[54px] h-6 rounded-sm">
      {fullStar}
      <p>{rating}</p>
    </div>
  )
}

export default RatingForMobile

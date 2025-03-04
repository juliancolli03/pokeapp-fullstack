import React from 'react'

const Pagination = ({
  page,
  total,
  limit,
  onPageChange,
  maxButtonsVisible = 10
}) => {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null 

  const getPageNumbers = () => {

    if (totalPages <= maxButtonsVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
  let start = page - Math.floor(maxButtonsVisible / 2)
    let end = start + maxButtonsVisible - 1

    if (start < 1) {
      start = 1
      end = start + maxButtonsVisible - 1
    }

    if (end > totalPages) {
      end = totalPages
      start = end - maxButtonsVisible + 1
    }

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  const handleClick = (num) => {
    if (num !== page) onPageChange(num)
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`btn me-1 ${num === page ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleClick(num)}
          disabled={num === page}
        >
          {num}
        </button>
      ))}
    </div>
  )
}

export default Pagination

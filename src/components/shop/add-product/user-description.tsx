'use client'

import DOMPurify from 'dompurify'

interface UserDescriptionProps {
  userContent: string;
}

export default function UserDescription({ userContent }: UserDescriptionProps) {
  // Sanitize the HTML content to ensure safety
  const sanitizedHTML = DOMPurify.sanitize(userContent)

  return (
    <div
      className="max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}

import React from 'react';
import { selectSearchQuery } from '../redux/users/usersSlice'
import { useAppSelector } from '../redux/hooks'

const getRegex = (text: string) => new RegExp(`(${text})`, 'gi')

const HighlightedText: React.FC<{ text: string }>  = ({ text }) => {
  const searchQuery = useAppSelector(selectSearchQuery).trim().toLowerCase()
  if (searchQuery === '' || !text.toLowerCase().includes(searchQuery)) {
    return <span>{text}</span>
  }
  const regExp = getRegex(searchQuery);
  const parts = text.split(regExp)
  return <span>
    {parts.map((part, index) => regExp.test(part) ? <mark key={index}>{part}</mark> : part) }
  </span>
}

export default HighlightedText
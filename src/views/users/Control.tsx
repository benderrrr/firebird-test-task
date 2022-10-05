import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  fetchUsers,
  resetUsers,
  changeSearchQuery,
  selectSearchQuery
} from '../../redux/users/usersSlice'
import styles from './Users.module.css'

const Control = () => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const resetHandle = () => dispatch(resetUsers())

  const onSearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchQuery(e.target.value))
  }

  return (
    <div className={styles.usersControl}>
      <div className={styles.controlSearch}>
        <label htmlFor="searchInput" className="form-label">Search</label>
        <input value={searchQuery} onChange={onSearchHandle} type="email" className="form-control" id="searchInput" />
      </div>
      <button
        onClick={resetHandle}
        className={`${styles.controlResetButton} btn btn-primary`}
      >
        Reset
      </button>
    </div>
)
}

export default Control

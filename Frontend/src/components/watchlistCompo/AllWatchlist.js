import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { useWatchlists } from '../../context/WatchlistContext';
import { deleteWatchlist } from './DeleteWatchlist';

const AllWatchlist = ({ setUpdateModal, setWatchlistId }) => {
  const { watchlists, fetchWatchlist } = useWatchlists();

  useEffect(() => {
    fetchWatchlist();
  }, [])

  const handleDelete = (id) => {
    deleteWatchlist(id);
    fetchWatchlist()
  }

  return (
    <>
      <div className='py-3'>
        <div className='d-flex justify-content-center gap-3 flex-wrap w-100'>
          {
            watchlists.length === 0 ? (
              <div className="rounded-2 overflow-hidden">
                <h1 className='text-bg-dark text-center text-nowrap px-2 mb-0 py-1 fs-2'>
                  No watchlists
                </h1>
              </div>
            ) :
              (
                watchlists.map((watchlist, idx) => {
                  return <div key={watchlist._id}>

                    <div className="text-bg-secondary rounded-2 overflow-hidden w-100">

                      <h1 className='text-bg-success text-nowrap mb-0 py-1 fs-2'>
                        <span className=' text-dark px-2'>{idx + 1}. </span>
                        {watchlist.watchlistName}
                        <span>
                          <i className="ri-delete-bin-6-line fs-5 text-dark float-end mx-2 my-2" onClick={() => handleDelete(watchlist._id)} />
                          <i className="ri-edit-box-line fs-5 text-dark float-end mx-2 my-2" onClick={() => { setUpdateModal(true); setWatchlistId(watchlist._id) }} />
                        </span>
                      </h1>

                      <Table responsive className='table mb-0 table-hover table-dark  table-bordered'>
                        <thead className='table-secondary'>
                          <tr>
                            <th>#</th>
                            <th>Stock name</th>
                            <th>Stock symbol</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            watchlist.stocks && watchlist.stocks.length > 0 ? (
                              watchlist.stocks.map((stock, idx) => {
                                return <tr key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>{stock.stockName}</td>
                                  <td>{stock.stockSymbol}</td>
                                  <td>{stock.price}</td>
                                </tr>
                              })
                            ) :
                              (
                                <tr>
                                  <td colSpan={4} className="text-center text-bg-danger">
                                    No stocks
                                  </td>
                                </tr>
                              )
                          }

                        </tbody>
                      </Table>

                    </div>
                  </div>
                }
                )
              )
          }
        </div>
      </div>
    </>
  )
}

export default AllWatchlist
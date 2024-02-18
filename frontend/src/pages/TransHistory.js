import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { AddTransModal } from '../components/Modal/AddTransModal';
import { DeleteTransModal  } from '../components/Modal/DeleteTransModal';
import { DeleteMultipleTransModal } from '../components/Modal/DeleteMultipleTransModal';
import { baseUrl, deleteUrl } from '../utils/constant';
import { FaSearch } from 'react-icons/fa';
import { EditTransModal } from '../components/Modal/EditTransModal';
import '../styles/TransHistory.css';

export const TransHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction =>
    Object.entries(transaction).some(([key, value]) => {
      const lowerCaseValue = String(value).toLowerCase();
      return (
        key === 'id' && lowerCaseValue.includes(searchQuery) ||
        typeof value === 'string' && lowerCaseValue.includes(searchQuery) ||
        typeof value === 'number' && lowerCaseValue.includes(searchQuery)
      );
    }) ||
    ['date'].some(field =>
      transaction[field] &&
      new Date(transaction[field]).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }).toLowerCase().includes(searchQuery)
    )
  );

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    const allTransactionIds = transactions.map(transaction => transaction._id);
    setSelectedCheckboxes(selectAllChecked ? [] : allTransactionIds);
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    console.log('Clicked checkbox with id:', id);
    setSelectAllChecked(false);
    setSelectedCheckboxes((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((itemId) => itemId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  // Handle click on update button
  const handleUpdateButtonClick = (transaction) => {
    // Pass the entire transaction object to ensure all properties are available
    setSelectedTransaction(transaction);
  };

  // Handle confirmation after updating
  const handleUpdateConfirm = () => {
    // After deletion is successful, you can reset the selectedTransactionId and close the modal
    setSelectedTransactionId(null);
  };
  
  // Handle deletion of selected transactions through checkboxes
  const handleDelete = async () => {
    try {
      // Check if any checkboxes are selected
      if (selectedCheckboxes.length === 0) {
        console.warn('No checkboxes selected for deletion.');
        return;
      }
  
      // Make a request to delete the selected transactions
      const response = await axios.delete(`${deleteUrl}`, {
        data: { ids: selectedCheckboxes }
      });
  
      console.log('API Response:', response.data);
      // You can handle the response as needed
  
      // Call the onConfirm callback to handle confirmation logic
      handleDeleteConfirm();
    } catch (error) {
      console.error('Error deleting transactions:', error);
      // Handle the error as needed
    }
  };

  // Handle click on delete button for a specific transaction
  const handleDeleteButtonClick = (transactionId) => {
    // Set the selected transaction ID before showing the modal
    setSelectedTransactionId(transactionId);
  };

  // Handle confirmation after deleting
  const handleDeleteConfirm = () => {
    // Additional logic or UI updates after successful deletion
  
    // For example, you might want to refresh the list of transactions
    axios.get(`${baseUrl}`)
      .then(res => {
        console.log('Updated list of transactions:', res.data);
        setTransactions(res.data);
      })
      .catch(err => {
        console.error('Error fetching updated data:', err);
        // Handle the error as needed
      });
  
    // Reset any necessary state variables
    setSelectAllChecked(false);
    setSelectedCheckboxes([]);
  };

  // useEffect to fetch transactions from the server when the component mounts
  useEffect(() => {
    axios.get(`${baseUrl}`)
      .then(res => {
        console.log('API Response:', res.data);
        setTransactions(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);

        // Log specific details of the error
        if (err.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with:', err.response.status, err.response.data);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('No response received. Request details:', err.request);
        } else {
          console.error('Error details:', err.message);
        }
      });
  }, []);
  
  return (
    <div>
      {/* Background */}
      <div className="bg">
        <div className="content">
          <div className="container-fluid">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-3">
                      <h4>All Transaction History</h4>
                    </div>
                    <div className="col-xs-6">
                      <a href="#addTransModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add Transaction</span></a>
                      <a href="#deleteMultipleTransModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>						
                    </div>
                    <div className="col-3 text-right">
                      <div className="search-bar">
                        <FaSearch className="search-icon"/>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>
                        <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="selectAll"
                          checked={selectAllChecked}
                          onChange={handleSelectAll}
                        />
                          <label htmlFor="selectAll"></label>
                        </span>
                      </th>
                      <th>ID </th>
                      <th>Date </th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th className="expand">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {currentTransactions.map((transaction,index) => (
                     <tr key={index}>
                      <td>
                        <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`checkbox${transaction._id}`}
                          checked={selectedCheckboxes.includes(transaction._id)}
                          onChange={() => handleCheckboxChange(transaction._id)}
                        />
                          <label htmlFor={`checkbox${index}`}></label>
                        </span>
                      </td>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.type}</td>
                      <td>
                        <a href="#editTransModal" className="edit" data-toggle="modal" onClick={() => handleUpdateButtonClick(transaction)}><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteTransModal" className="delete" data-toggle="modal"  onClick={() => handleDeleteButtonClick(transaction._id)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                       
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
                
                  {/* Pagination */}
                  <ReactPaginate
                    pageCount={Math.ceil(filteredTransactions.length / itemsPerPage)}
                    marginPagesDisplayed={1}
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel="..."
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                    pageClassName="page-item"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                  />
              </div>
            </div>        
          </div>

          {/* Modals */}
          <AddTransModal/>
          <EditTransModal 
          transaction={selectedTransaction} 
          onConfirm={handleUpdateConfirm}
          />
          <DeleteTransModal
          transactionId={selectedTransactionId}
          selectedCheckboxes={selectedCheckboxes}
          onConfirm={handleDeleteConfirm}
          onClose={() => setSelectedTransactionId(null)}
          />
          <DeleteMultipleTransModal
          handleDelete={handleDelete}
          />

          

        </div>
      </div>
    </div>
  );
};

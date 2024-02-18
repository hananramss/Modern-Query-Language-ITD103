import React from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { updateUrl } from '../../utils/constant';

// Function to format the date as "yyyy-mm-dd" for the input
const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    return dateObject.toISOString().split('T')[0];
};

// Function to unformat the date back to the original format
const unformatDate = (formattedDate) => {
    return new Date(formattedDate).toISOString();
};

export const EditTransModal = ({transaction, onConfirm}) => {

    const [date, setDate] = useState(transaction?.date ? formatDate(transaction.date) : '');
    const [description, setDescription] = useState(transaction?.description || '');
    const [amount, setAmount] = useState(transaction?.amount || '');
    const [category, setCategory] = useState(transaction?.category || '');
    const [type, setType] = useState(transaction?.type || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const updatedTransaction = {
            date: unformatDate(date), // Convert back to the original format before sending
            description,
            amount,
            category,
            type,
          };
    
          const response = await axios.put(`${updateUrl}/${transaction._id}`, updatedTransaction);
    
          console.log('Transaction updated successfully:', response.data);
          onConfirm(); // Call onConfirm to close the modal or perform additional actions
          window.location.reload();
        } catch (error) {
          console.error('Error updating transaction by ID:', error);
          // Handle the error as needed
          // You can show an error message to the user or log specific details
        }
      };

      useEffect(() => {
        // Update the state when the transaction prop changes
        setDate(transaction?.date ? formatDate(transaction.date) : '');
        setDescription(transaction?.description || '');
        setAmount(transaction?.amount || '');
        setCategory(transaction?.category || '');
        setType(transaction?.type || '');
      }, [transaction]);
    
      if (!transaction) {
        // If transaction is null, you can choose to render an error message or return null
        return null;
      }

      

  return (
    <div>
        <div id="editTransModal" className="modal fade">
        <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">						
                    <h4 claclassNamess="modal-title">Update Transaction</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  </div>
                  <div className="modal-body">					
                    <div className="form-group">
                      <label>Date</label>
                      <input type="date" className="form-control"   value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input type="text" placeholder= "Enter Description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                      <label>Amount</label>
                      <input type="number" placeholder= "Enter Amount" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}  required>
                        <option value="Salary">Salary</option>
                        <option value="Freelance Income">Freelance Income</option>
                        <option value="Rental Income">Rental Income</option>
                        <option value="Investment Gains">Investment Gains</option>
                        <option value="Gifts/Inheritance">Gifts/Inheritance</option>
                        <option value="Rent/Mortgage">Rent/Mortgage</option>
                        <option value="Utilities (Electricity, Water, Gas)">Utilities (Electricity, Water, Gas)</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Dining Out">Dining Out</option>
                        <option value="Transportation (Gas, Public Transit)">Transportation (Gas, Public Transit)</option>
                        <option value="Health Care">Health Care</option>
                        <option value="ExpInsurance (Car, Health, Home)ense">Insurance (Car, Health, Home)</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Travel">Travel</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>	
                    <div className="form-group">
                     <label>Type</label>
                     <select className="form-control"  value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                     </select>
                    </div>				
                  </div>
                  <div className="modal-footer">
                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                    <input type="submit" className="btn btn-success" value="Update"/>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

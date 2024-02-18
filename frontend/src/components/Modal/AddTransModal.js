import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { addUrl } from '../../utils/constant'

export const AddTransModal = ({ addTransaction }) => {

    const [date, setDate] = useState()
    const [description, setDescription] = useState()
    const [amount, setAmount] = useState()
    const [category, setCategory] = useState('Salary')
    const [type, setType] = useState('Income')
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${addUrl}`, {date, description, amount, category, type})
            .then(res => {
                console.log('API Response:', res.data);
                // Close the modal
                setShowModal(false);

                // You can also refresh the page here if needed
                window.location.reload();
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
        }

  return (
    <div>
        <div id="addTransModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">						
                    <h4 className="modal-title">Add Transaction</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  </div>
                  <div className="modal-body">					
                    <div className="form-group">
                      <label>Date</label>
                      <input type="date" className="form-control"  onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input type="text" placeholder= "Enter Description" className="form-control" onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                      <label>Amount</label>
                      <input type="number" placeholder= "Enter Amount" className="form-control" onChange={(e) => setAmount(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select className="form-control" onChange={(e) => setCategory(e.target.value)} value={category} required>
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
                     <select className="form-control"  onChange={(e) => setType(e.target.value)} value={type} required>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                     </select>
                    </div>				
                  </div>
                  <div className="modal-footer">
                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                    <input type="submit" className="btn btn-success" value="Add"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
    </div>
  )
}
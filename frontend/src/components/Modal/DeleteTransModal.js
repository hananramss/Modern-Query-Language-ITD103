import React from 'react';
import axios from 'axios';
import { deleteUrl } from '../../utils/constant';

export const DeleteTransModal = ({ transactionId, onConfirm, onClose }) => {

    const handleDeleteRow = async () => {
        try {
          const response = await axios.delete(`${deleteUrl}/${transactionId}`);
          console.log('After axios.delete:', response.data);
          onConfirm(); // Call the onConfirm callback passed as a prop
          onClose();  // Call the onClose callback passed as a prop

          window.location.reload();
        } catch (error) {
          console.error('Error deleting transaction by ID:', error);
          // ... (rest of your error logging logic)
          return { error: true, message: 'Failed to delete transaction.' };
        }
      };
      

  return (
    <div>
      <div id="deleteTransModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">						
                <h4 className="modal-title">Delete Transaction</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">					
                <p>Are you sure you want to delete these Records?</p>
                <p className="text-warning"><small>This action cannot be undone.</small></p>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                <input type="submit" className="btn btn-danger" onClick={handleDeleteRow} value="Delete" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

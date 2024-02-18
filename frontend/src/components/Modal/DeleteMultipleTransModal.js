import React from 'react';

export const DeleteMultipleTransModal = ({handleDelete}) => {

    const handleDeleteButtonClick = () => {
        // Call the handleDelete function passed as a prop
        handleDelete();
      };

    return (
        <div>
          <div id="deleteMultipleTransModal" className="modal fade">
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
                    <input type="submit" className="btn btn-danger" onClick={handleDeleteButtonClick} value="Delete" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

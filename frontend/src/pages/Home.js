import React from 'react'
import '../styles/Home.css'

export const Home = () => {
  return (
    <div>
      {/* Background */}
      <div className="bg-">
        <div className="home-content">
          <div className="title-container">
            <h1>Track your <span style={{ color: '#4ab998' }}>Expenses</span></h1>
            <p><i>Effortlessly monitor and manage your financial transactions, diving into details such as dates, descriptions, amounts, categories, and transaction types. Stay organized and take control of your finances with our intuitive expense tracking system.</i></p>
            </div>

          <section id="features">
            <div className="feature-container">
              <h2>Features</h2>
              <hr style={{ borderColor: '#b8f0e1' }} />
              <div className="features">
                <ul className="feature-list">
                  <div className="feature">
                    <h4>Add Transaction</h4>
                    <img className="feature-img" src="/img/addTrans.png" alt="Add Transaction Image" />
                    <li><strong>Record New Transactions:</strong> Easily add new transactions to your transaction history.</li>
                    <li><strong>Enter Details:</strong> Input transaction details, including date, description, amount, category, and type.</li>
                  </div>
                  <div className="feature">
                    <h4>Update Transaction</h4>
                    <img className="feature-img"  src="img/updatedTrans.png" alt="Update Transaction Image"/>
                    <li><strong>View and Modify:</strong>  View and modify existing transactions in your transaction history.</li>
                    <li><strong>Update Details:</strong>  Edit details such as date, description, amount, category, and type.</li>
                  </div>
                  <div className="feature">
                    <h4>Delete Transaction</h4>
                    <img className="feature-img"  src="img/deleteTrans.png" alt="Delete Transaction Image"/>
                    <li><strong>Manage Records:</strong> Efficiently manage and organize your transaction history.</li>
                    <li><strong>Remove Transactions:</strong> Delete unwanted or outdated transactions from your records.</li>
                  </div>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


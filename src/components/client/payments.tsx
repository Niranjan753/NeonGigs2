'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave, faClock, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';

interface Payment {
  id: number;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'in escrow';
  freelancer: string;
  project: string;
}

const ClientPayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, amount: 500, date: '2023-06-15', status: 'completed', freelancer: 'John Doe', project: 'Website Redesign' },
    { id: 2, amount: 750, date: '2023-06-20', status: 'pending', freelancer: 'Jane Smith', project: 'Mobile App Development' },
    { id: 3, amount: 300, date: '2023-06-25', status: 'completed', freelancer: 'Mike Johnson', project: 'SEO Optimization' },
  ]);

  const [isEscrowLoading, setIsEscrowLoading] = useState(false);
  const [escrowMessage, setEscrowMessage] = useState('');

  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = payments.filter(payment => payment.status === 'pending');

  const initiateEscrowPayment = (paymentId: number) => {
    setIsEscrowLoading(true);
    setEscrowMessage('Initiating escrow payment...');

    // Simulate API call to third-party escrow service
    setTimeout(() => {
      setEscrowMessage('Verifying payment details...');
      setTimeout(() => {
        setEscrowMessage('Securing funds in escrow...');
        setTimeout(() => {
          setIsEscrowLoading(false);
          setEscrowMessage('');
          
          // Update the payment status to 'in escrow'
          setPayments(prevPayments =>
            prevPayments.map(payment =>
              payment.id === paymentId ? { ...payment, status: 'in escrow' } : payment
            )
          );
        }, 2000);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black p-4 rounded-lg border border-gray-700">
          <FontAwesomeIcon icon={faCreditCard} className="text-blue-500 text-3xl mb-2" />
          <h2 className="text-xl font-semibold mb-1">Total Spent</h2>
          <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-black p-4 rounded-lg border border-gray-700">
          <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500 text-3xl mb-2" />
          <h2 className="text-xl font-semibold mb-1">Pending Payments</h2>
          <p className="text-2xl font-bold">{pendingPayments.length}</p>
        </div>
        <div className="bg-black p-4 rounded-lg border border-gray-700">
          <FontAwesomeIcon icon={faClock} className="text-yellow-500 text-3xl mb-2" />
          <h2 className="text-xl font-semibold mb-1">Next Payment Due</h2>
          <p className="text-2xl font-bold">
            {pendingPayments.length > 0 ? pendingPayments[0].date : 'No pending payments'}
          </p>
        </div>
      </div>

      {isEscrowLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-black">
            <FontAwesomeIcon icon={faLock} spin className="text-4xl mb-4 text-blue-500" />
            <p className="text-lg font-semibold">{escrowMessage}</p>
          </div>
        </div>
      )}

      <div className="bg-black rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2">Date</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Freelancer</th>
                <th className="pb-2">Project</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-700">
                  <td className="py-2">{payment.date}</td>
                  <td className="py-2">${payment.amount.toFixed(2)}</td>
                  <td className="py-2">{payment.freelancer}</td>
                  <td className="py-2">{payment.project}</td>
                  <td className="py-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'completed' ? 'bg-green-200 text-green-800' : 
                      payment.status === 'in escrow' ? 'bg-blue-200 text-blue-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      <FontAwesomeIcon icon={
                        payment.status === 'completed' ? faCheckCircle : 
                        payment.status === 'in escrow' ? faLock : faClock
                      } className="mr-1" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2">
                    {payment.status === 'pending' && (
                      <button
                        onClick={() => initiateEscrowPayment(payment.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Escrow Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientPayments;

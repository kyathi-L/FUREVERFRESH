import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);

      // Fetch booked services
      axios.get(`http://localhost:3000/api/bookings/user/${storedUser._id}`)
        .then(res => setServices(res.data))
        .catch(err => console.error("Error fetching services:", err));

      // Fetch payments
      axios.get(`http://localhost:3000/payments/user/${storedUser._id}`)
        .then(res => setPayments(res.data))
        .catch(err => console.error("Error fetching payments:", err));
    }
  }, []);

  if (!user) return <div>Please log in</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Welcome, {user.name}</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Your Booked Services</h3>
        {services.length === 0 ? <p>No bookings yet.</p> : (
          <ul>
            {services.map(service => (
              <li key={service._id}>
                {service.serviceName} - {new Date(service.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Your Orders</h3>
        {payments.length === 0 ? <p>No payments yet.</p> : (
          <ul>
            {payments.map(pay => (
              <li key={pay._id}>
                ₹{pay.amount} - {new Date(pay.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

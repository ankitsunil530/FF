import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";


import { myOrders } from "@/store/order-slice/order";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {loading ? (
        <p>Loading...  </p>
      ) : error ? (

        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="py-2 px-4 border">{order._id}</td>

                  <td className="py-2 px-4 border">{order.products[0].product.name}</td>
                  <td className="py-2 px-4 border">                  <img src={order.products[0].product.images[0].url} className="w-10 h-10" alt={order.products[0].product.name} />
                  </td>
                  <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">₹{order.totalAmountWithShipping}</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 text-xs font-semibold ${order.orderStatus === "DELIVERED" ? "text-green-600" : "text-yellow-600"}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

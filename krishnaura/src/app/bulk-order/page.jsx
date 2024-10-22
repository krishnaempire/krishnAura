'use client'

import { useToast } from '@/components/ui/use-toast';
import { Button, Input, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';


export default function BulkOrderPage() {
  const { toast } = useToast();
  const user = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );
  const [orders, setOrders] = useState([{ description: '', name: '', mobile: '' }])



  const showErrorToast = (message) => {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: message,
    });
  };

  const showSuccessToast = (message) => {
    toast({
      description: message,
    });
  };

  const addOrder = () => {
    setOrders([...orders, { description: '', name: '', mobile: '' }])
  }

  const removeOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index)
    setOrders(newOrders)
  }

  const updateOrder = (index, field, value) => {
    const newOrders = [...orders]
    newOrders[index][field] = value
    setOrders(newOrders)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!orders) {
      showErrorToast('Please fill all fields');
      return;
    }
    const orderData = {
      orders
    }

    console.log(orderData)
    try {
      const res = await fetch('/api/sendmail/send-bulk-order', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      if (data.error) {
        showErrorToast(data.error);
      } else {
        showSuccessToast('Order sent');
        setOrders([{ description: '', name: '', mobile: '' }])
      }
    } catch (error) {
      console.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bulk Order</h1>
      <form onSubmit={handleSubmit}>
        {orders.map((order, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
              {orders.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  className='bg-[#d4a72c] text-white'
                  size="icon"
                  onClick={() => removeOrder(index)}
                >
                  Remove
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor={`description-${index}`}>Description</label>
                <Textarea
                  id={`description-${index}`}
                  value={order.description}
                  onChange={(e) => updateOrder(index, 'description', e.target.value)}
                  placeholder="Enter order description"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`name-${index}`}>Name</label>
                  <Input
                    id={`name-${index}`}
                    value={order.name}
                    onChange={(e) => updateOrder(index, 'name', e.target.value)}
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`mobile-${index}`}>Mobile Number</label>
                  <Input
                    id={`mobile-${index}`}
                    type="tel"
                    value={order.mobile}
                    onChange={(e) => updateOrder(index, 'mobile', e.target.value)}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <button type="button" onClick={addOrder} className="flex items-center">
            + Add Another Order
          </button>
          <button type="submit">Submit All Orders</button>
        </div>
      </form>
    </div>
  )
}
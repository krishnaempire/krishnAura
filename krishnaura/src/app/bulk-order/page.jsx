'use client'

import { useToast } from '@/components/ui/use-toast';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';

export default function BulkOrderPage() {
  const { toast } = useToast();
  const [order, setOrder] = useState([{ description: '', name: '', mobile: '' }]);

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

  const updateOrder = (index, field, value) => {
    const newOrders = [...order];
    newOrders[index][field] = value;
    setOrder(newOrders);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if all fields in the order are filled
    if (order.some(({ name, mobile, description }) => !name || !mobile || !description)) {
      showErrorToast('Please fill all fields');
      return;
    }

    const orderData = {
      order,
    };

    try {
      const res = await fetch('/api/sendmail/send-bulk-order', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (data.error) {
        showErrorToast(data.error);
      } else {
        showSuccessToast('Order sent');
        setOrder([{ description: '', name: '', mobile: '' }]);
      }
    } catch (error) {
      console.error(error.message || 'Something went wrong');
      showErrorToast('An unexpected error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[6rem] bg-[#f3dac2]">
      <h1 className="text-3xl font-bold mb-6">Bulk Order</h1>
      <form onSubmit={handleSubmit}>
        {order.map((item, index) => (
          <div key={index} className="mb-6 p-4  rounded-lg">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`name-${index}`}>Name</label>
                  <Input
                    id={`name-${index}`}
                    color={"danger"}
                    value={item.name}
                    onChange={(e) => updateOrder(index, 'name', e.target.value)}
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`mobile-${index}`}>Mobile Number</label>
                  <Input
                    id={`mobile-${index}`}
                    color={"danger"}
                    type="tel"
                    value={item.mobile}
                    onChange={(e) => updateOrder(index, 'mobile', e.target.value)}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`description-${index}`}>Description</label>
                <Textarea
                  id={`description-${index}`}
                  color={"danger"}
                  value={item.description}
                  onChange={(e) => updateOrder(index, 'description', e.target.value)}
                  placeholder="Write what you want from us:-"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        <Button type="submit" className="mt-4 bg-[#d4a72c] text-white">
          Submit Order
        </Button>
      </form>
    </div>
  );
}

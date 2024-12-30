'use client'

import { useToast } from '@/components/ui/use-toast';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';

export default function BulkOrderPage() {
  const { toast } = useToast();
  const [order, setOrder] = useState({ description: '', name: '', mobile: '' });

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

  const updateOrder = (field, value) => {
    setOrder((prevOrder) => ({ ...prevOrder, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if all fields in the order are filled
    if (!order.name || !order.mobile || !order.description) {
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
        setOrder({ description: '', name: '', mobile: '' });
      }
    } catch (error) {
      console.error(error.message || 'Something went wrong');
      showErrorToast('An unexpected error occurred');
    }
  };

  return (
    <div className="container relative top-[6rem] sm:top-[8rem] xl:top-0 mx-auto w-[24rem] sm:w-[40rem] px-4 py-8 mt-[7rem]">
      <h1 className="text-3xl font-bold mb-6">Bulk Order/Any Enquiry</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-end justify-center w-full'>
        <div className="mb-6 p-4 rounded-lg w-full">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  // color="danger"
                  value={order.name}
                  onChange={(e) => updateOrder('name', e.target.value)}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile">Mobile Number</label>
                <Input
                  id="mobile"
                  // color="danger"
                  type="tel"
                  value={order.mobile}
                  onChange={(e) => updateOrder('mobile', e.target.value)}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                // color="danger"
                value={order.description}
                onChange={(e) => updateOrder('description', e.target.value)}
                placeholder="Write what you want from us:-"
                required
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-4 w-full bg-[#edc49e] text-white">
          Submit Order
        </Button>
      </form>
    </div>
  );
}

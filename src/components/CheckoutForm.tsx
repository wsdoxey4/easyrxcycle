import { useState, FormEvent } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

export default function CheckoutForm({ onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [ready, setReady] = useState(false);

  console.log('CheckoutForm - stripe:', !!stripe, 'elements:', !!elements, 'ready:', ready);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      onError('An unexpected error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-lg bg-white" style={{ minHeight: '300px' }}>
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
          onReady={() => {
            console.log('PaymentElement is ready!');
            setReady(true);
          }}
          onLoadError={(error) => {
            console.error('PaymentElement load error:', error);
          }}
          onChange={(event) => {
            console.log('PaymentElement change:', event);
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-teal-600 text-white py-4 rounded-lg font-bold hover:bg-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Processing...
          </>
        ) : (
          'Complete Payment'
        )}
      </button>
    </form>
  );
}

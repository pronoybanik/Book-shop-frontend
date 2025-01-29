import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  clearCart,
  removeBookFromCart,
} from "../../redux/features/product/productSlice";
import PrimaryButton from "../../utils/PrimaryButton";
import SecondaryButton from "../../utils/SecondaryButton";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";

const AddToCard = () => {
  const cartBooks = useSelector((state: RootState) => state.addBooks.books);
  const userInfo = useSelector((state: RootState) => state.auth.user);

  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const calculateTotal = () => {
    const subtotal = cartBooks.reduce((acc, book) => acc + book.price, 0);
    const vat = subtotal * 0.1;
    const discount = subtotal > 100 ? 10 : 0;
    return { subtotal, vat, discount, total: subtotal + vat - discount };
  };

  const { subtotal, vat, discount, total } = calculateTotal();

  const handleOrder = async () => {
    if (!userInfo) {
      alert("Please log in to place an order.");
      return;
    }

    if (cartBooks.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Extract product IDs from cart
    const orderData = {
      userId: userInfo?.userId,
      products: cartBooks.map((book) => ({
        productId: book._id,
        quantity: 1,
      })),
      totalPrice: total,
    };

    try {
      const response = await createOrder(orderData);
      if (response?.data.success === true) {
        toast.success("Order placed successfully!");
      } else {
        toast.error("Order are cancel !");
      }
      // Clear cart after successful order
      dispatch(clearCart());
    } catch (error) {
      console.error("Order Failed:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your Cart
          </h1>
        </header>

        {/* Cart Content */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {cartBooks.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <>
              {/* Cart Items */}
              <ul className="space-y-4 border-b pb-4">
                {cartBooks.map((book) => (
                  <li key={book._id} className="flex items-center gap-4">
                    <img
                      src={book?.image || "https://via.placeholder.com/50"}
                      alt={book.title}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm  text-gray-900">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600">TK {book.price}</p>
                    </div>
                    <button
                      onClick={() => dispatch(removeBookFromCart(book._id))}
                      className="text-gray-600 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* Price Summary */}
              <div className="mt-4">
                <dl className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between border-b pb-2">
                    <dt className="font-medium">Subtotal</dt>
                    <dd>TK {subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="font-medium">VAT (10%)</dt>
                    <dd>TK {vat.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="font-medium">Discount</dt>
                    <dd className="text-green-600">
                      -TK {discount.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <dt>Total</dt>
                    <dd>TK {total.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
                <button onClick={() => dispatch(clearCart())}>
                  <PrimaryButton>Clear Cart</PrimaryButton>
                </button>
                <button onClick={handleOrder}>
                  <SecondaryButton>Order Now</SecondaryButton>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCard;

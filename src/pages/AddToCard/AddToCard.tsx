import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  clearCart,
  removeBookFromCart,
} from "../../redux/features/product/productSlice";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../utils/PrimaryButton";

const AddToCart = () => {
  const cartBooks = useSelector((state: RootState) => state.addBooks.books);
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotal = () => {
    const subtotal = cartBooks.reduce(
      (acc, book) => acc + book.price * (book.quantity || 1),
      0
    );
    const vat = subtotal * 0.1;
    const discount = subtotal > 100 ? 10 : 0;
    return { subtotal, vat, discount, total: subtotal + vat - discount };
  };

  const { subtotal, vat, discount, total } = calculateTotal();

  const handleOrder = async () => {
    if (!userInfo) {
      toast.error("Please log in to place an order.");
      return;
    }
    if (cartBooks.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: userInfo?.userId,
      products: cartBooks.map((book) => ({
        productId: book._id,
        quantity: book.quantity || 1,
      })),
      totalPrice: total,
    };

    try {
      const response = await createOrder(orderData);
      if (response?.data.success === true) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        setTimeout(() => {
          navigate("/UserDashboard/my-order");
        }, 1000);
      } else {
        toast.error("Order was cancelled!");
      }
    } catch (error) {
      console.error("Order Failed:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛒 Your Shopping Cart
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        {cartBooks.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is currently empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="divide-y">
              {cartBooks.map((book) => (
                <li key={book._id} className="flex items-center py-4 gap-4">
                  <img
                    src={book?.image || "https://via.placeholder.com/60"}
                    alt={book.title}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {book.quantity || 1}
                    </p>
                    <p className="text-sm text-gray-700">
                      ৳ {book.price.toFixed(2)} x {book.quantity || 1} ={" "}
                      <span className="font-semibold">
                        ৳ {(book.price * (book.quantity || 1)).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(removeBookFromCart(book._id))}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (10%)</span>
                <span>৳ {vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-৳ {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-2 border-t pt-2">
                <span>Total</span>
                <span>৳ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full sm:w-auto px-6 py-2 text-sm font-semibold bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Clear Cart
              </button>
              <div
                onClick={handleOrder}
              >
                <PrimaryButton>order now</PrimaryButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCart;

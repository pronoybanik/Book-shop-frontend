import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Book = {
    _id: string;
    title: string;
    author: string;
    category: string;
    price: number;
    quantity: number;
    inStock: boolean;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
};

// Define State Type
type TBooks = {
    books: Book[];
};

// Load books from local storage if available
const loadBooksFromLocalStorage = (): Book[] => {
    const storedBooks = localStorage.getItem("cartBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
};

// Initial State
const initialState: TBooks = {
    books: loadBooksFromLocalStorage(),
};

// Create Slice
const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBookToCart: (state, action: PayloadAction<Book>) => {
            const bookExists = state.books.find((book) => book._id === action.payload._id);
            
            if (!bookExists) {
                state.books.push(action.payload);
                localStorage.setItem("cartBooks", JSON.stringify(state.books));
            }
        },
        removeBookFromCart: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter(book => book._id !== action.payload);
            localStorage.setItem("cartBooks", JSON.stringify(state.books));
        },
        clearCart: (state) => {
            state.books = [];
            localStorage.removeItem("cartBooks");
        }
    }
});

// Export actions and reducer
export const { addBookToCart, removeBookFromCart, clearCart } = bookSlice.actions;
export default bookSlice.reducer;

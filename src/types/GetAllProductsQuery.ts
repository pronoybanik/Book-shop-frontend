export type TGetAllProductsQuery = {
    searchTerm?: string;
    sort?: string;
    category?: string;
    page?: number;
    limit?: number;
    priceMin?: string;
    priceMax?: string;
};

/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-card", info);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_card_products = createAsyncThunk(
  "card/get_card_products",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-card-products/${userId}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_card_product = createAsyncThunk(
  "card/delete_card_product",
  async (card_id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-card-product/${card_id}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_inc = createAsyncThunk(
  "card/quantity_inc",
  async (card_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${card_id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_dec = createAsyncThunk(
  "card/quantity_dec",
  async (card_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${card_id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_wishList = createAsyncThunk(
  "wishlist/add_to_wishList",
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-wishlist", info);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_wishlist_products = createAsyncThunk(
  "wishlist/get_wishlist_products",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get_wishlist_products/${userId}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove_wishlist = createAsyncThunk(
  "wishlist/remove_wishlist",
  async (wishlist_id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/remove-wishlist/${wishlist_id}`
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const cardReducer = createSlice({
  name: "card",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    card_products: [],
    card_products_count: 0,
    buy_product_item: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    shiping_fee: 0,
    outofstock_products: [],
  },

  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(add_to_card.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(add_to_card.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.loader = false;
    });

    builder.addCase(add_to_card.fulfilled, (state, { payload }) => {
      state.loader = false;
      if (payload && payload.message) {
        state.successMessage = payload.message;
      }
      state.card_products_count = state.card_products_count + 1;
    });

    //  =>

    builder.addCase(get_card_products.fulfilled, (state, { payload }) => {
      state.card_products = payload.card_products;
      state.price = payload.price;
      state.card_products_count = payload.card_product_count;
      state.shiping_fee = payload.shipping_fee;
      state.outofstock_products = payload.outOfStockProduct;
      state.buy_product_item = payload.buy_product_item;
    });

    // ==>

    builder.addCase(delete_card_product.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    //
    builder.addCase(quantity_inc.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(quantity_dec.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });

    // ------>

    builder.addCase(add_to_wishList.fulfilled, (state, { payload }) => {
      state.loader = false;
      if (payload && payload.message) {
        state.successMessage = payload.message;
      }
      state.wishlist_count =
        state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
    });
    builder.addCase(add_to_wishList.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });

    builder.addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
      state.wishlist = payload.wishlists;
      state.wishlist_count = payload.wishlistCount;
    });

    builder.addCase(remove_wishlist.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.wishlist = state.wishlist.filter(
        (p) => p._id !== payload.wishlist_id
      );
      state.wishlist_count = state.wishlist_count - 1;
    });
  },
});

export const { messageClear } = cardReducer.actions;
export default cardReducer.reducer;

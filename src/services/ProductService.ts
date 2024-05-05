import { coerce, number, safeParse, parse } from "valibot";
import axiosInstance from "../api/productApi";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types/types";
import { toBoolean } from "../helpers";

interface ProductData {
  [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      await axiosInstance.post("/api/products", {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const { data } = await axiosInstance("/api/products");

    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const { data } = await axiosInstance(`/api/products/${id}`);

    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const NumberSchema = coerce(number(), Number);

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });

    if (result.success) {
      await axiosInstance.put(`/api/products/${id}`, result.output);
    }
  } catch (error) {}
}

export async function deleteProduct(id: Product["id"]) {
  try {
    await axiosInstance.delete(`/api/products/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    await axiosInstance.patch(`/api/products/${id}`);
  } catch (error) {
    console.log(error);
  }
}

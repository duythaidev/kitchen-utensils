'use server'
import { revalidateTag } from "next/cache";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const handleUpdateProfileAction = async (userId: string, formData: FormData, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: `/users/${userId}`,
      method: "PATCH",
      body: formData,
      accessToken,
      tag: "profile",
      isFormData: true,
    });
    if (!ok) return { success: false, message: data.message || "Update failed" };
    revalidateTag("profile");
    return { success: true, message: "Profile updated", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};

export const handleUpdatePasswordAction = async (userData: any, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: "/users/change-password",
      method: "PATCH",
      body: userData,
      accessToken,
      tag: "profile",
    });
    if (!ok) return { success: false, message: data.message || "Update failed" };
    revalidateTag("profile");
    return { success: true, message: "Password updated successfully", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};

export const addReview = async (productId: number, rating: number, comment: string, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: "/reviews",
      method: "POST",
      body: { product_id: productId, rating, comment },
      accessToken,
      tag: "list-reviews",
    });
    if (!ok) return { success: false, message: data.message || "Server error" };
    revalidateTag("list-reviews");
    return { success: true, message: "Review added", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};

export const deleteReview = async (productId: number, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: "/reviews",
      method: "DELETE",
      body: { product_id: productId },
      accessToken,
      tag: "list-reviews",
    });
    if (!ok) return { success: false, message: data.message || "Server error" };
    revalidateTag("list-reviews");
    return { success: true, message: "Review removed", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};

export const addToCart = async (productId: number, quantity: number, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: "/carts",
      method: "POST",
      body: { product_id: productId, quantity },
      accessToken,
    });
    if (!ok) return { success: false, message: data.message || "Server error" };
    return { success: true, message: "Added to cart", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};

export const checkout = async (address: string, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: "/carts/checkout",
      method: "POST",
      body: { address },
      accessToken,
      tag: "list-cartitems",
    });
    if (!ok) return { success: false, message: data.message || "Checkout failed" };
    revalidateTag("list-cartitems");
    return { success: true, message: "Checkout successful", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};

export const removeProductFromCart = async (productId: number, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: "/carts",
      method: "DELETE",
      body: { product_id: productId },
      accessToken,
      tag: "list-cartitems",
    });
    if (!ok) return { success: false, message: data.message || "Remove failed" };
    revalidateTag("list-cartitems");
    return { success: true, message: "Removed from cart", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};

export const updateCartQuantity = async (productId: number, quantity: number, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: "/carts",
      method: "PUT",
      body: { product_id: productId, quantity },
      accessToken,
      tag: "list-cartitems",
    });
    if (!ok) return { success: false, message: data.message || "Update failed" };
    revalidateTag("list-cartitems");
    return { success: true, message: "Quantity updated", data };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error" };
  }
};
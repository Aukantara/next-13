"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}
const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/products/${productId}`);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleModal} className="btn btn-error btn-sm">
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete {product.title}</h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            <button type="submit" onClick={() => handleDelete(product.id)} className="btn btn-primary">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;

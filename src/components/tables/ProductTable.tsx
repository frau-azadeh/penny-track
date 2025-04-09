import React from 'react'
import { Product } from '../../store/featcher/productSlice'
import { Button } from '../ui';

interface ProductTableProps{
  products: Product[];
  onEdit: (product: Product)=> void;
  onDelete: (id: string) => void;
}

const ProductTable:React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr>
          <th className='border p-2'>نام</th>
          <th className='border p-2'>قیمت</th>
          <th className='border p-2'>تعداد</th>
          <th className='border p-2'>تاریخ</th>
          <th className='border p-2'>توضیحات</th>
          <th className='border p-2'>دسته بندی</th>
          <th className='border p-2'>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product)=>(
          <tr key={product.id} className='border'>
            <td className='border p-2'>{product.name}</td>
            <td className='border p-2'>{product.price}</td>
            <td className='border p-2'>{product.quantity}</td>
            <td className='border p-2'>{product.date}</td>
            <td className='border p-2'>{product.description}</td>
            <td className='border p-2'>{product.category}</td>
            <td className='border p-2 space-x-2'>
              <Button variant='secondary' onClick={()=> onEdit(product)}>
                ویرایش
              </Button>
              <Button variant='danger' onClick={()=> onDelete(product.id)}>
                حذف
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable
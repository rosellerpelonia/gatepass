import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface TableRow {
  item: number;
  description: string;
  quantity: number;
  remarks: string;
}

export default function Particulars() {
  const [form, setForm] = useState<TableRow>({ item: 0, description: '', quantity: 0, remarks: '' });
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState({ item: '', description: '', quantity: '' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const updateItemsPerPage = () => {
      setCurrentPage(1); // Reset to first page on resize
    };
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'quantity' || name === 'item' ? Number(value) : value });
    setErrors({ ...errors, [name]: ''})
  };

  const handleAdd = () => {
    const newErrors = { item: '', description: '', quantity: '' };
    if (!form.item) newErrors.item = 'Item Code is required*';
    if (!form.description) newErrors.description = 'Description is required*';
    if (!form.quantity) newErrors.quantity = 'Quantity is required*';

    if (newErrors.item || newErrors.description || newErrors.quantity) {
      setErrors(newErrors); // Set error messages
      return;
    }

    setTableData([...tableData, form]);
    setForm({ item: 0, description: '', quantity: 0, remarks: '' });
    setErrors({ item: '', description: '', quantity: '' }); // Clear errors
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setForm(tableData[index]);
    setIsEditModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmEdit = () => {
    if (editIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editIndex] = form;
      setTableData(updatedData);
      setIsEditModalOpen(false);
      setEditIndex(null);
      setForm({ item: 0, description: '', quantity: 0, remarks: '' });
    }
  };

  const confirtabletelete = () => {
    if (deleteIndex !== null) {
      setTableData(tableData.filter((_, i) => i !== deleteIndex));
      setIsDeleteModalOpen(false);
      setDeleteIndex(null);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = tableData.filter(row =>
    row.item.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.remarks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Pagination handlers
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-8 space-y-4 w-full lg:max-w-full lg:space-x-8 bg-gray-50">
    <div className="w-full bg-white p-6 rounded-lg shadow lg:max-w-full">
     <h2 className="text-2xl font-bold text-blue-600 border-b pb-4 mb-4">Particulars</h2>

      <div className="tablet:w-1/2 space-y-6 mb-10">
        <div className="space-y-4">
          {/* Input fields for adding items */}
          <div className='space-y-0'>
          <input
            type="number"
            name="item"
            placeholder="Item Code"
            value={form.item === 0 ? '' : form.item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
            required
          />
          {errors.item && <p className="text-red-500 text-sm  ">{errors.item}</p>}
          </div>

          <div className='space-y-0'>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
            required
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity === 0 ? '' : form.quantity}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
            required
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>
         
          <input
            type="text"
            name="remarks"
            placeholder="Remarks (optional)"
            value={form.remarks}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-blue-600 h-8 flex items-center justify-center"
            >
            Add
          </button>
        </div>
      </div>

      <div className="flex items-center border-b border-gray-300 focus-within:border-blue-500 mb-5 tablet:w-1/2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full focus:outline-none focus:ring-0"
        />
      </div>

      {displayedData.length > 0 && (
        <>
          <div className="overflow-x-auto hidden tablet:block">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg mb-5">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b font-medium text-left">Item Code</th>
                  <th className="py-2 px-4 border-b font-medium text-left">Description</th>
                  <th className="py-2 px-4 border-b font-medium text-left">Quantity</th>
                  <th className="py-2 px-4 border-b font-medium text-left">Remarks</th>
                  <th className="py-2 px-4 border-b font-medium text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b max-w-[100px] break-words whitespace-normal">{row.item}</td>
                    <td className="py-2 px-4 border-b max-w-[100px] break-words whitespace-normal">{row.description}</td>
                    <td className="py-2 px-4 border-b max-w-[100px] break-words whitespace-normal">{row.quantity}</td>
                    <td className="py-2 px-4 border-b max-w-[100px] break-words whitespace-normal">{row.remarks}</td>
                    <td className="py-2 px-4 border-b text-center align-middle">
                    <div className="flex items-center justify-center space-x-2 h-full">
                    <button onClick={() => handleEdit(index)} className="p-2 rounded-full border border-gray-300 text-blue-500 hover:text-blue-700 focus:bg-blue-200">
                    <PencilIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(index)} className="p-2 rounded-full border border-gray-300 text-red-500 hover:text-red-700 focus:bg-red-200">
                      <TrashIcon className="h-4 w-4" />
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tablet:hidden space-y-4">
            {displayedData.map((row, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 max-w-full overflow-hidden">
                <p className="break-words whitespace-pre-wrap"><strong>Item Code:</strong> {row.item}</p>
                <p className="break-words whitespace-pre-wrap"><strong>Description:</strong> {row.description}</p>
                <p className="break-words whitespace-pre-wrap"><strong>Quantity:</strong> {row.quantity}</p>
                <p className="break-words whitespace-pre-wrap"><strong>Remarks:</strong> {row.remarks}</p>
                <div className="flex space-x-4 mt-5">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 rounded-full border border-gray-300 text-blue-500 hover:text-blue-700 focus:bg-blue-200"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 rounded-full border border-gray-300 text-red-500 hover:text-red-700 focus:bg-red-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination and Save Button */}
          <div className="flex justify-between items-center mt-4">
            <button 
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-blue-600 h-8 flex items-center justify-center" 
            onClick={() => console.log("Save data")}>
              Save
            </button>
            <div className="text-center">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>
              <span className="mx-2">
                {currentPage}/{totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</button>
            </div>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Edit Item</h2>
                <input
                  type="number"
                  name="item"
                  placeholder="Item Code"
                  value={form.item === 0 ? '' : form.item}
                  onChange={handleInputChange}
                  className="w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={form.quantity === 0 ? '' : form.quantity}
                  onChange={handleInputChange}
                  className="w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="remarks"
                  placeholder="Remarks"
                  value={form.remarks}
                  onChange={handleInputChange}
                  className="w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                    Cancel
                  </button>
                  <button onClick={confirmEdit} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h2>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                    No
                  </button>
                  <button onClick={confirtabletelete} className="px-4 py-2 bg-red-500 text-white rounded">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
}

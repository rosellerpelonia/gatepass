import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Item {
  id: number;
  item: string;
  description: string;
  qty: number;
  remarks?: string;
}

export default function GatePassForm() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemInput, setItemInput] = useState({ item: '', description: '', qty: 0, remarks: '' });
  const [page, setPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [errors, setErrors] = useState({ item: '', description: '', qty: '' });

  const itemsPerPage = 3;


  const handleAddItem = () => {
    const newErrors = { item: '', description: '', qty: '' };

    if (!itemInput.item) newErrors.item = 'Item is required*';
    if (!itemInput.description) newErrors.description = 'Description is required*';
    if (itemInput.qty <= 0) newErrors.qty = 'Quantity is required*';

    if (newErrors.item || newErrors.description || newErrors.qty) {
      setErrors(newErrors);
      return;
    }

    const newItem = { ...itemInput, id: Date.now() };
    setItems([...items, newItem]);
    setItemInput({ item: '', description: '', qty: 0, remarks: '' });
    setErrors({ item: '', description: '', qty: '' });
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const confirmTableDelete = () => {
    setItems(items.filter(item => item.id !== itemToDelete));
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleEdit = (item: Item) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const saveEdit = () => {
    setItems(items.map(item => (item.id === itemToEdit?.id ? itemToEdit : item)));
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };

  const saveItems = () => {

  };

  return (
    <div className="p-8 space-y-4 w-full tablet:flex tablet:space-x-8 bg-gray-50 items-stretch">
    {/* First Column - GatePass Form */}
    <div className="tablet:w-1/2 bg-white p-6 rounded-lg shadow flex flex-col h-full">
      <h1 className="text-2xl font-bold text-blue-600 border-b pb-4">GatePass Form</h1>
      <div className="space-y-4 mt-4">

          <div className="w-full">
            <label className="block font-medium text-gray-700">
              Type  <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name="type" value="bread" className="form-radio" />
                <span className="ml-2">Bread</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="type" value="non-bread" className="form-radio" />
                <span className="ml-2">Non-Bread</span>
              </label>
            </div>
          </div>

          <div className="w-full tablet:w-1/2">

            <input
              type="text"
              name="gatepass_no"
              placeholder="Enter Gate Pass No"
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
              required
            />
          </div>

          <div className="w-full tablet:w-1/2">
            <label className="block font-medium text-gray-700">
              Date Requested <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date_requested"
              className="w-full border-b border-gray-300 focus:border-blue-500 text-gray-400 focus:ring-0 outline-none"
              required
            />
          </div>

          <div className="w-full tablet:w-1/2">
            <label className="block font-medium text-gray-700">
              Date and Time Needed <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="date_time_requested"
              className="w-full border-b border-gray-300 text-gray-400 focus:border-blue-500 focus:ring-0 outline-none"
              required
            />
          </div>

          <div className="w-full tablet:w-1/2">
            <label className="block font-medium text-gray-700">
              Please allow Mr./Mrs <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="allow"
              placeholder="Enter Full Name"
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
              required
            />
          </div>

          <div className=" w-full tablet:w-1/2">
            <select
              name="company"
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none text-gray-400"
              required
              defaultValue=""
              onChange={(e) =>
                e.target.classList.toggle("text-gray-900", e.target.value !== "")
              }
            >
              <option value="" disabled>
                Select Company
              </option>
              <option value="company1">Company 1</option>
              <option value="company2">Company 2</option>
              <option value="company3">Company 3</option>
              <option value="company4">Company 4</option>
            </select>
          </div>

          <div className="w-full tablet:w-1/2">
            <select
              name="department"
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none text-gray-400"
              required
              defaultValue=""
              onChange={(e) =>
                e.target.classList.toggle("text-gray-900", e.target.value !== "")
              }
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="company1">
                MIS
              </option>
              <option value="company2">
                Logistics
              </option>
              <option value="company3">
                Sales
              </option>
              <option value="company4">
                GTDC
              </option>
            </select>
          </div>

          <div className="w-full tablet:w-1/2">
            <input
              type="text"
              name="remarks"
              placeholder="Input Remarks (optional)"
              className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none mb-2"
              required
            />
          </div>
        </div>
      </div>

      {/* Second Column - Item Entry and List */}
      <div className="tablet:w-1/2 bg-white p-6 rounded-lg shadow flex flex-col h-full">
      <h1 className="text-2xl font-bold text-blue-600 border-b pb-4 ">Item Entry</h1>
      <div className="space-y-4 mt-4">
          <div className='space-y-0'>
          <input
            type="text"
            placeholder="Item"
            value={itemInput.item}
            onChange={(e) => setItemInput({ ...itemInput, item: e.target.value })}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
            required
          />
          {errors.item && <p className="text-red-500 text-sm">{errors.item}</p>}
          </div>
          
          <div className='space-y-0'>
          <input
            type="text"
            placeholder="Description"
            value={itemInput.description}
            onChange={(e) => setItemInput({ ...itemInput, description: e.target.value })}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
            required
          />
           {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
           </div>

          <div className='space-y-0'>
          <input
            type="number"
            placeholder="Quantity"
            value={itemInput.qty === 0 ? '' : itemInput.qty}
            onChange={(e) => setItemInput({ ...itemInput, qty: parseInt(e.target.value) })}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
            required
          />
          {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}

          </div>
          <input
            type="text"
            placeholder="Remarks (optional)"
            value={itemInput.remarks}
            onChange={(e) => setItemInput({ ...itemInput, remarks: e.target.value })}
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none mb-2"
          />
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-blue-600 h-8 flex items-center justify-center"
          >
            Add
          </button>
        </div>

        <div className="space-y-4">
          {currentItems.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg hover:bg-blue-100">
              <div className="flex flex-col">
                <div className="flex-1">
                  <p className="break-words whitespace-pre-wrap"><strong>Item:</strong> {item.item}</p>
                  <p className="break-words whitespace-pre-wrap"><strong>Description:</strong> {item.description}</p>
                  <p><strong>Qty:</strong> {item.qty}</p>
                  <p className="break-words whitespace-pre-wrap"><strong>Remarks:</strong> {item.remarks || 'N/A'}</p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <div className="p-2 rounded-full border border-gray-300 text-blue-500 hover:text-blue-700 focus:bg-blue-200">
                    <PencilIcon
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(item)}
                    />
                  </div>
                  <div className="p-2 rounded-full border border-gray-300 text-red-500 hover:text-red-700 focus:bg-red-200">
                    <TrashIcon
                      className="w-4 h-4 text-red-600 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>
              </div>

            </div>

          ))}


          {items.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={saveItems}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-blue-600 h-8 flex items-center justify-center"
                >
                Save
              </button>

              {/* Pagination on the Right */}
              {items.length > itemsPerPage && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-400 rounded-tablet disabled:opacity-50 hover:bg-blue-600"
                  >
                    &lt;
                  </button>
                  <span className="text-lg">{page} / {totalPages}</span>
                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-400 rounded-tablet disabled:opacity-50 hover:bg-blue-600"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p>Are you sure you want to delete this item?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button onClick={() => setIsDeleteConfirmOpen(false)} className="bg-gray-300 px-4 py-2 rounded-tablet">No</button>
                <button onClick={confirmTableDelete} className="bg-red-500 text-white px-4 py-2 rounded-tablet">Yes</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-tablet space-y-4">
              <h2 className="text-lg font-semibold">Edit Item</h2>
              <input
                type="text"
                placeholder="Item"
                value={itemToEdit?.item || ''}
                onChange={(e) => setItemToEdit({ ...itemToEdit!, item: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                value={itemToEdit?.description || ''}
                onChange={(e) => setItemToEdit({ ...itemToEdit!, description: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={itemToEdit?.qty === 0 ? '' : itemToEdit?.qty}
                onChange={(e) => setItemToEdit({ ...itemToEdit!, qty: parseInt(e.target.value) })}
                className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
              />
              <input
                type="text"
                placeholder="Remarks"
                value={itemToEdit?.remarks || ''}
                onChange={(e) => setItemToEdit({ ...itemToEdit!, remarks: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-blue-500 focus:ring-0 outline-none"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-tablet">Cancel</button>
                <button onClick={saveEdit} className="bg-blue-500 text-white px-4 py-2 rounded-tablet">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

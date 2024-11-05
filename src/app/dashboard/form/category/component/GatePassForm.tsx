export default function GatePassForm() {
    return (
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold">GatePass Form</h1>
        <form className="space-y-4">
          {/* Radio Buttons for Bread and Non-Bread */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Type:</label>
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
  
          {/* Text Field for Gate Pass No */}
          <div>
            <label className="block font-medium text-gray-700">Gate Pass No:</label>
            <input
              type="text"
              name="gatepass_no"
              placeholder="Enter Gate Pass No"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
  
          {/* Text Field for Date Requested */}
          <div>
            <label className="block font-medium text-gray-700">Date Requested:</label>
            <input
              type="date"
              name="date_requested"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </form>
      </div>
    );
  }
  
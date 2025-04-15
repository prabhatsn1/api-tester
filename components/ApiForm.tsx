import { ApiDetails } from "@/types/ApiDetails";
import React, { useState } from "react";

interface ApiFormProps {
  onSubmit: (apis: ApiDetails[]) => void;
  apis: ApiDetails[];
  setApis: React.Dispatch<React.SetStateAction<ApiDetails[]>>;
}

const ApiForm: React.FC<ApiFormProps> = ({ onSubmit, apis, setApis }) => {
  // const [apis, setApis] = useState<ApiDetails[]>([
  //   { url: "", method: "GET", headers: "", body: "" },
  // ]);

  const handleChange = (index: number, field: string, value: string) => {
    const newApis = [...apis];
    newApis[index] = { ...newApis[index], [field]: value };
    setApis(newApis);
  };

  const handleAddApi = () => {
    setApis([...apis, { url: "", method: "GET", headers: "", body: "" }]);
  };

  const handleSubmit = () => {
    onSubmit(apis);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="h-150 overflow-y-auto">
        {apis.map((api, index) => (
          <div key={index} className="mb-6">
            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="URL"
              value={api.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
            <select
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={api.method}
              onChange={(e) => handleChange(index, "method", e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <textarea
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Headers (JSON)"
              value={api.headers}
              onChange={(e) => handleChange(index, "headers", e.target.value)}
            />
            <textarea
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Body (JSON)"
              value={api.body}
              onChange={(e) => handleChange(index, "body", e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleAddApi}
        >
          Add API
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ApiForm;

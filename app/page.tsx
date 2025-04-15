"use client";

import { useState } from "react";
import { testApis } from "../utils/testApis";
import { ApiDetails } from "@/types/ApiDetails";
import ApiForm from "@/components/ApiForm";

const Home: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [apis, setApis] = useState<ApiDetails[]>([]);

  const handleFormSubmit = async (apis: ApiDetails[]) => {
    const results = await testApis(apis);
    setResults(results);
  };

  const handleAddApi = () => {
    setApis([...apis, { url: "", method: "GET", headers: "", body: "" }]);
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleTestApi = async (index: number) => {
    const apiToTest = apis[index];
    const result = await testApis([apiToTest]);
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[index] = result[0];
      return updatedResults;
    });
  };

  return (
    <div className="relative px-50">
      <h1 className="text-2xl font-bold mb-4">API Tester</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={handleAddApi}
      >
        Add API
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ml-4"
        onClick={() => handleFormSubmit(apis)}
      >
        Test API
      </button>

      <div className="mt-6 space-y-4">
        {apis.map((api, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">URL: {api.url || "Not Set"}</p>
              <p>Method: {api.method}</p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={() => handleTestApi(index)}
            >
              Test
            </button>
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          {results.map((result, index) => (
            <div
              key={index}
              className="border p-4 my-5 rounded-lg shadow-md bg-gray-100"
            >
              <p className="font-semibold">API {index + 1} Result:</p>
              <pre className="text-sm bg-gray-200 p-2 rounded">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add API Details</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleSidebarClose}
            >
              ✕
            </button>
          </div>
          <ApiForm
            onSubmit={() => {
              handleSidebarClose();
            }}
            apis={apis}
            setApis={setApis}
          />
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleSidebarClose}
        ></div>
      )}
    </div>
  );
};

export default Home;

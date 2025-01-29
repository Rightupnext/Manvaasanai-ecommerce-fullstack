import React from "react";

function NutritionalInformation({ product }) {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nutrient
              </th>
              <th scope="col" className="px-6 py-3">
                Value per 100g
              </th>
              <th scope="col" className="px-6 py-3">
                Value per Serving (25g)
              </th>
              <th scope="col" className="px-6 py-3">
                Dv Percent (25g)
              </th>
            </tr>
          </thead>
          <tbody>
            {product.nutrients.map((nutrient, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {nutrient.nutrientName}
                </th>
                <td className="px-6 py-4">{nutrient.valuePer100g}</td>
                <td className="px-6 py-4">{nutrient.valuePerServing}</td>
                <td className="px-6 py-4">{nutrient.dvPercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default NutritionalInformation;

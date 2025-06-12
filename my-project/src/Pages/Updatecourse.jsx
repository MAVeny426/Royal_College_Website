import React from 'react';
import dashboard from '../college_website/dashboard.jpg';

const Updatecourse = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${dashboard})`,backgroundSize: 'cover',backgroundPosition: 'center',}}>
        <div className="flex h-full w-full justify-center items-start">
          <div className="bg-blue-500 bg-opacity-80 w-[800px] h-auto mt-[100px] p-10 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Course</h2>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-white">Select Course</label>
                <select className="w-full p-2 rounded text-black">
                  <option value="">Choose course</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatecourse;

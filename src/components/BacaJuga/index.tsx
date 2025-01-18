import React from "react";

export default function BacaJuga() {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <>
      <div className="mt-4 mb-4 bg-gray-50   p-2 flex gap-2">
        <h4 className="font-medium ">Baca juga:</h4>
        <div className="">
          <p className="font-semibold text-primary lg:hidden ">
            {truncateText(
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
              30
            )}
          </p>
          <p className="font-semibold text-primary lg:block hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quae
          </p>
        </div>
      </div>
    </>
  );
}

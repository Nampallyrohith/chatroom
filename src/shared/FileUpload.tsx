import { ImagePlus } from "lucide-react";

export const FileUpload = ({
  handleImageUpload,
}: {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative">
      {/* Hidden native file input */}
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Custom label with icon */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-flex items-center h-full gap-2 px-3 py-1 rounded  text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
      >
        <ImagePlus className="w-6 h-6" />
      </label>
    </div>
  );
};

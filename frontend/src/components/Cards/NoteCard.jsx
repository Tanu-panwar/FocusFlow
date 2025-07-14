
import moment from "moment"
import React from "react"
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border-2 border-[#f23064] rounded-xl p-4 bg-white hover:shadow-2xl transition-all ease-in-out transform hover:scale-[1.02]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-md text-xl font-semibold text-[#f23064]">{title}</h6>
          <span className="text-xs text-green-700">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        {/* Pin Icon */}
        <MdOutlinePushPin
          className={`cursor-pointer text-2xl transition-colors ${isPinned ? "text-blue-500" : "text-slate-300 hover:text-gray-500"
            }`}
          onClick={onPinNote}
        />
      </div>

      {/* Note Content Preview */}
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {content?.slice(0, 80)}...
      </p>

      {/* Tags & Action Buttons */}
      <div className="flex items-center justify-between mt-3">
        {/* Tags */}
        <div className="text-xs text-slate-500 italic flex flex-wrap gap-1">
          {tags.map((item, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded-lg">
              #{item}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <MdCreate
            className="cursor-pointer text-xl text-green-500 hover:scale-110 transition-transform"
            onClick={onEdit}
          />

          <MdDelete
            className="cursor-pointer text-xl text-[#f23064] hover:scale-110 transition-transform"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default NoteCard


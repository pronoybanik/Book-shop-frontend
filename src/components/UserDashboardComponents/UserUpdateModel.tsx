import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  status: "active" | "blocked";
  needsPasswordChange: boolean;
}

interface Props {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
}

const UserUpdateModal = ({ user, isOpen, onClose, onSubmit }: Props) => {
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    status: user.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
        <Dialog.Panel className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">
            Update User
          </Dialog.Title>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Name"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserUpdateModal;

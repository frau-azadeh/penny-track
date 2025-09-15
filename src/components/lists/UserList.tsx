import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { User, deleteUser, updateUser } from "../../store/featcher/userSlice";
import { RootState } from "../../store/store";
import UserForm, { UserFormValues } from "../forms/UserForm";
import { Button, Modal } from "../ui";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users: User[] = useSelector((state: RootState) => {
    return state.users && "users" in state.users ? state.users.users : [];
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user: User) => {
    setSelectedUser({ ...user });
    setIsEditOpen(true);
  };

  const handleUpdate = (data: UserFormValues) => {
    if (selectedUser) {
      dispatch(updateUser({ id: selectedUser.id, ...data }));
      setIsEditOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
          >
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="space-x-2">
              <Button variant="secondary" onClick={() => handleEdit(user)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(user.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
      {/* Modal for Edit */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selectedUser && (
          <UserForm
            defaultValues={{
              name: selectedUser.name, // ✅ به صورت دقیق مقدار name
              email: selectedUser.email, // ✅ به صورت دقیق مقدار email
            }}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default UserList;

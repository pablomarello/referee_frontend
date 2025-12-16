import { useEffect, useState, useCallback } from "react";
import {
  getAllUsers,
  getUserById as getUserByIdApi,
  createUser as createUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from "../services/users.api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

  const getUserById = useCallback(async (id) => {
    try {
      const res = await getUserByIdApi(id);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  //crear usuario
  const createUser = async (userData) => {
      const res = await createUserApi(userData);
      toast.success("Usuario creado");
      await fetchUsers();
  }

  //editar usuario
  const updateUser = async (id, userData) => {
    const res = await updateUserApi(id, userData);
    toast.success("Usuario actualizado");
    await fetchUsers();
  }

  //eliminar usuario
  const deleteUser = async (id) => {
  const confirm = await Swal.fire({
    title: "¿Eliminar Usuario?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  });

  if (confirm.isConfirmed) {
    await deleteUserApi(id);
    setUsers((prev) => prev.filter((m) => m._id !== id));
    toast.success("Eliminado correctamente");
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, getUserById, createUser, updateUser, deleteUser };
};

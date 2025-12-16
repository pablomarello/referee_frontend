import { useEffect, useState } from "react";
import { getAllRoles } from "../services/roles.api";

export const useRoles = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoles = async () => {
        try {
          const res = await getAllRoles();
          setRoles(res.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
          fetchRoles();
        }, []);
      
        return { roles, loading, error };
}
import { useState,useEffect } from "react"
import { searchUsersByName } from "../api/api";
interface User {
    _id: string;
    name: string;
  }
const useSearchUsers = (searchText: string) => {
const [foundUsers, setFoundUsers] = useState<User[]>([]);
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
    if(!searchText){
        setFoundUsers([]);
        return;
    }

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await searchUsersByName(searchText)
            setFoundUsers(data.users);
            setError(null);
        } catch (err) {
            setError('Failed to fetch user.')
            setFoundUsers([])
        }finally{
            setLoading(false)
        }
    };
    fetchUsers();
},[searchText]);
return { foundUsers, loading, error }
}
export default useSearchUsers
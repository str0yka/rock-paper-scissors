import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  useQuery<{ roomId: string }, { error: string }>({
    queryFn: () => axios.get('http://localhost:5001/new').then((res) => res.data),
    onSuccess: (data) => {
      navigate(`/${data.roomId}`);
    },
  });

  return <h1>home page</h1>;
};

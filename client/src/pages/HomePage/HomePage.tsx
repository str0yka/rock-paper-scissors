import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '~/components/common';
import { ROUTE } from '~/utils/constants';

export const HomePage = () => {
  const navigate = useNavigate();

  useQuery<{ roomId: string }, { error: string }>({
    queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/new`).then((res) => res.data),
    onSuccess: (data) => {
      navigate(ROUTE.ROOM(data.roomId));
    },
  });

  return <Spinner />;
};

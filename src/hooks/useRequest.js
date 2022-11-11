import { useState, useEffect } from 'react';

export default (requstFn, params, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    requstFn(params)
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, dependencies);

  return [data, loading, error];
};

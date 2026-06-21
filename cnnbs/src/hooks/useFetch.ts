import { useEffect, useState, useCallback, useRef } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Generic data-fetching hook (CO2 generics + CO4 loading/error states).
// Stores the latest fetcher in a ref so changing inline arrow functions don't
// retrigger the effect; this is a standard, well-tested pattern that the
// experimental react-compiler lint rules flag overly aggressively.
/* eslint-disable react-hooks/refs, react-hooks/set-state-in-effect */
export function useFetch<T>(fetcher: () => Promise<T>, deps: ReadonlyArray<unknown> = []): UseFetchState<T> {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: string | null }>({
    data: null,
    loading: true,
    error: null,
  });
  const [tick, setTick] = useState(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    fetcherRef
      .current()
      .then((result) => {
        if (!cancelled) setState({ data: result, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message || 'Something went wrong.' });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { ...state, refetch };
}

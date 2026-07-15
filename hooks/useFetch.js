"use client";

import { useEffect, useState } from "react";

/**
 * Minimal client-side data-fetching hook for simple GET requests.
 * For anything more complex (mutations, caching, revalidation), reach for
 * a real library (SWR/React Query) instead of growing this further.
 */
export function useFetch(url, options) {
  const [state, setState] = useState({ data: null, error: null, loading: Boolean(url) });

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    setState((s) => ({ ...s, loading: true, error: null }));
    fetch(url, options)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, error, loading: false });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

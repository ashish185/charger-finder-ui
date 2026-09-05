"use client";

import { useQuery } from "@tanstack/react-query";
import { CpoStationService } from "@/services/cpoStationService";
import { STATE } from "@/app/constants";

const CPO_STATIONS_QUERY_KEY = ["cpoStations"];

const fetchStations = async () => {
  const data = await CpoStationService.listMyStations();
  return data?.stations ?? [];
};

export const useCpoStations = () => {
  const { data: stations, status, error, refetch } = useQuery({
    queryKey: CPO_STATIONS_QUERY_KEY,
    queryFn: fetchStations,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const stationsStatus =
    status === "pending" ? STATE.LOADING : status === "success" ? STATE.SUCCESS : STATE.ERROR;

  return {
    stations: stations ?? [],
    status: stationsStatus,
    error: error?.message || "Could not load your stations.",
    retry: refetch,
  };
};

import Button from "@/components/atoms/button";
import type { FetchSuccess, MessageResponse } from "@/constants/types";
import {
  logoutRequest,
  reportRefreshStolenRequest,
} from "@/features/auth/authApi";
import { securedContentHandler } from "@/features/dashboard/securedContentApi";
import { isFetchError } from "@/helpers/fetch";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const {
    states: { user, access_token },
    actions: { setNotAuthed },
  } = useAuth();
  const [data, setData] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    await logoutRequest();
    setNotAuthed();
    navigate("/");
    setIsProcessing(false);
  };

  const handleReportStolenToken = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    await reportRefreshStolenRequest();

    setIsProcessing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const response = await securedContentHandler({ access_token });
        if (isFetchError(response)) {
          setData("Failed to fetch secured content.");
        } else {
          setData((response as FetchSuccess<MessageResponse>).data.message);
        }
      } catch {
        //ignore the catch
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-heading-4">Dashboard</h1>
      <p className="text-lg">
        Welcome {(user?.name as string).split(" ")[0]} to your dashboard!
      </p>
      <div className="p-5 max-w-[400px] text-center border border-secondary rounded-m mt-5 font-content-accent">
        {loadingData ? "Loading..." : data}
      </div>
      <div className="mt-5 w-full max-w-[400px]">
        <p className="text-sm text-secondary inline-block font-highlight-accent text-center">
          Note: When you report that your refresh token has been stolen, your
          old refresh token will be invalidated and a new one will be issued.
          You will stay logged in on your current device, but all other devices
          using the same account will be logged out as soon as they refresh the
          page, their access token expires, or they try to perform any action
          that requires authentication.
        </p>
      </div>
      <div className="w-full flex justify-between gap-x-3 mt-5">
        <Button
          type="button"
          onClick={handleReportStolenToken}
          disabled={isProcessing}
        >
          Report My Refresh Token Has Been Stolen
        </Button>
        <Button type="button" onClick={handleLogout} disabled={isProcessing}>
          Logout
        </Button>
      </div>
    </div>
  );
}

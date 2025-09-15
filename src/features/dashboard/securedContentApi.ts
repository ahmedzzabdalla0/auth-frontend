import { fetchRequest } from "@/services/fetch";
import { dashboardEndpoints } from "@/constants/endpoints";
import type { ErrorFetchService, MessageResponse } from "@/constants/types";

export async function securedContentHandler(config = {}) {
  try {
    return await fetchRequest<MessageResponse>(
      dashboardEndpoints.securedContent,
      {
        config: {
          skipSuccessHandler: true,
          ...config,
        },
      }
    );
  } catch (error) {
    return error as ErrorFetchService;
  }
}

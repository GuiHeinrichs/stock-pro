import { NextResponse } from "next/server";
import { NotificationService } from "@/app/services/notificationService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = Number(searchParams.get("clientId"));
  
  if (!clientId) {
    return NextResponse.json({ message: "clientId is required" }, { status: 400 });
  }
  const notifications = await NotificationService.list(clientId);
  return NextResponse.json(notifications);
}

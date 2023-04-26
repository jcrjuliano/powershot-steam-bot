import { Controller, Get } from "@tsed/common";

@Controller("/health")
export class HealthController {
  @Get("/")
  public async getHealth(): Promise<{ status: string }> {
    return { status: "status: up" };
  }
}

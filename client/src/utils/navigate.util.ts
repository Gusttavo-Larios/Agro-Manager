import { router } from "@/router";

export class NavigateUtil {
  static navigateTo(path: string, body?: any) {
    router.navigate(path, {
      state: body,
    });
  }
}

import { NavigateUtil } from "./navigate.util";

export class SystemUtil {
  static signOut() {
    sessionStorage.clear();
    NavigateUtil.navigateTo("/");
  }
}

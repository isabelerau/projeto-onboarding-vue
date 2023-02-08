import {
  getModule,
  Action,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "../index";

@Module({
  name: "global",
  dynamic: true,
  store: store,
})
class GlobalModule extends VuexModule {
  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  @Mutation
  public setLoading(loading: boolean): void {
    this._loading = loading;
  }

  @Action
  public startLoading(): void {
    this.setLoading(true);
  }

  @Action
  public dismissLoading(): void {
    this.setLoading(false);
  }
}

export default getModule(GlobalModule);

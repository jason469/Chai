import {RouterOutlet} from "@angular/router";

export const optional = {
  optional: true
}

export function prepareRoute(outlet: RouterOutlet) {
  if (outlet.isActivated) return outlet.activatedRoute.snapshot.url; else return null
}
